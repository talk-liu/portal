
const Service = require('egg').Service

class OptionExerciseDetailService extends Service {

  async get(params) {
    // this.ctx.logger.debug('exercise_detail service', JSON.stringify(params))
    // return this.ctx.helper.mock('exercise_details').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionExerciseDetail')
  }
}

module.exports = OptionExerciseDetailService
