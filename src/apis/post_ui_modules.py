from bottle import HTTPResponse

from common_functions.request_enable_cors import enable_cors
from common_functions.request_log_args import get_request_log_args
from config.config import set_cfg_details_modules
from log.log import log_inbound
from resources.global_resources.log_vars import logPass, logFail, logException
from resources.global_resources.variables import *


def post_ui_modules(request):
    #
    args = get_request_log_args(request)
    #
    try:
        #
        new_modules = request.json
        new_modules = new_modules['modules']
        #
        r = set_cfg_details_modules(new_modules)
        if r:
            status = httpStatusSuccess
            args['result'] = logPass
        else:
            status = httpStatusFailure
            args['result'] = logFail
        #
        args['http_response_code'] = status
        args['description'] = '-'
        log_inbound(**args)
        #
        response = HTTPResponse()
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
