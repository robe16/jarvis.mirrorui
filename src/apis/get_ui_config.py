from bottle import HTTPResponse

from common_functions.request_enable_cors import enable_cors
from common_functions.request_log_args import get_request_log_args
from config.config import get_cfg_details_modules
from log.log import log_inbound
from resources.global_resources.log_vars import logPass, logException
from resources.global_resources.variables import *


def get_ui_config(request):
    #
    args = get_request_log_args(request)
    #
    try:
        #
        status = httpStatusSuccess
        args['result'] = logPass
        #
        args['http_response_code'] = status
        args['description'] = '-'
        log_inbound(**args)
        #
        r = 'window.onload=function() {'
        for module in get_cfg_details_modules():
            service = module['service']
            bundle = module['bundle']
            index = module['index']
            try:
                url = module['url']
            except:
                url = False
            try:
                dividerTop = module['dividerTop']
            except:
                dividerTop = False
            try:
                dividerBottom = module['dividerBottom']
            except:
                dividerBottom = False
            r += "service_init('{service}', '{bundle}', {index}, '{url}', {dividerTop}, {dividerBottom});".format(service=service,
                                                                                                                  bundle=bundle,
                                                                                                                  index=index,
                                                                                                                  url=url,
                                                                                                                  dividerTop=str(dividerTop).lower(),
                                                                                                                  dividerBottom=str(dividerBottom).lower())

        r += '}'
        #
        response = HTTPResponse()
        response.body = r
        response.status = status
        enable_cors(response)
        #
        return response
        #
    except Exception as e:
        #
        status = httpStatusServererror
        #
        args['result'] = logException
        args['http_response_code'] = status
        args['description'] = '-'
        args['exception'] = e
        log_inbound(**args)
        #
        raise HTTPResponse(status=status)
