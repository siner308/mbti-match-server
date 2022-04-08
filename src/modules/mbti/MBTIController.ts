import express from 'express';
import { MBTIService } from './MBTIService';
import {
  Controller,
  Params,
  Body,
  Res,
  Get,
  Post,
  HttpCode,
  Req,
  BodyParam,
} from 'routing-controllers';
import { CreateMatch, GetGroupById } from './MBTIValidator';
import { Group } from '../../entities/Group';

@Controller('/api/mbti')
class MBTIController {
  private service: MBTIService;

  constructor() {
    this.service = MBTIService.getInstance();
  }

  @HttpCode(201)
  @Post()
  public async post(
    @Req() req: express.Request,
    @BodyParam('name') name: string,
    @Body() body: CreateMatch,
    @Res() res: express.Response,
  ): Promise<express.Response> {
    const group: Group = await this.service.createGroup(body);
    return res.status(201).send({ id: group.id });
  }

  @Get('/:groupId')
  async getOne(
    @Params({ validate: true }) params: GetGroupById,
    @Res() res: express.Response,
  ): Promise<express.Response> {
    const { groupId } = params;
    const { users, matches, group } = await this.service.getByGroupId(groupId);
    return res.status(200).send({
      users,
      matches,
      group,
    });
  }
}

export default MBTIController;
