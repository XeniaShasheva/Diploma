import { Params } from "@angular/router"
import { ActiveParamsType } from "src/types/active-params.type"


export class ActiveParamsUtil{
        static processParam(params:Params):ActiveParamsType{
            const activeParams:ActiveParamsType={}
            if(params.hasOwnProperty('sort')){
              activeParams.sort = params['sort']
            }
            if(params.hasOwnProperty('page')){
              activeParams.page = +params['page']
            }

            return activeParams
        }
}