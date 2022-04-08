import { CreateMatch } from './MBTIValidator';
import { Group } from '../../entities/Group';
import { BadRequestError, NotFoundError } from 'routing-controllers';
import { User } from '../../entities/User';
import { Match } from '../../entities/Match';
import { MatchScore, MBTI } from '../../enums';
import { MBTIMatchTable } from '../../MBTIMatchTable';

export class MBTIService {
  private static _default: MBTIService;

  public static getInstance(): MBTIService {
    if (!MBTIService._default) MBTIService._default = new MBTIService();
    return MBTIService._default;
  }

  async getByGroupId(groupId: string): Promise<{ users: User[]; matches: Match[] }> {
    const group: Group = await Group.createQueryBuilder('group')
      .where('group.id = :groupId', { groupId })
      .leftJoinAndSelect('group.users', 'users')
      .leftJoinAndSelect('users.matches', 'matches')
      .getOne();

    if (!group) throw new NotFoundError('not found group error');

    const matches: Match[] = [];
    group.users.forEach((user: User) => {
      matches.push(...user.matches);
      delete user.matches;
    });

    return {
      users: group.users,
      matches,
    };
  }

  validateMbti(mbti: string): boolean {
    if (
      !'IE'.includes(mbti[0]) ||
      !'SN'.includes(mbti[1]) ||
      !'TF'.includes(mbti[2]) ||
      !'JP'.includes(mbti[3])
    ) {
      throw new BadRequestError('invalid mbti');
    }
    return true;
  }

  async createGroup(body: CreateMatch): Promise<Group> {
    const { name, mbti, groupId, groupName } = body;
    this.validateMbti(mbti);

    let group: Group;
    if (!groupId) {
      group = new Group();
      group.users = [];
      if (groupName) group.name = groupName;
    } else {
      group = await Group.createQueryBuilder('group')
        .where('group.id = :groupId', { groupId })
        .leftJoinAndSelect('group.users', 'users')
        .leftJoinAndSelect('users.matches', 'matches')
        .getOne();
      if (!group) throw new NotFoundError('not found group error');
      const existUser: User = await User.findOne({ where: { groupId, name } });
      if (existUser) throw new BadRequestError('same name user already exist');
    }

    const user: User = new User();
    user.name = name;
    user.mbti = mbti;
    user.matches = group.users?.map((target: User) => {
      const match: Match = new Match();
      match.target = target;
      match.score = this.#getMatchScore(user.mbti, target.mbti);
      match.source = user;
      return match;
    });

    group.users.push(user);
    return group.save();
  }

  #getMatchScore: (source: MBTI, target: MBTI) => MatchScore = (
    source: MBTI,
    target: MBTI,
  ): MatchScore => {
    return MBTIMatchTable[source][target];
  };
}
