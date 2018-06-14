from bottle import HTTPResponse, HTTPResponse

from apis.log_arguments import _get_log_args
from apis.cors import enable_cors
from config.config import get_cfg_details_modules
from resources.global_resources.log_vars import logPass, logFail, logException
from resources.global_resources.variables import *
from log.log import log_inbound


def get_ui_config(request):
    #
    args = _get_log_args(request)
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
            r += module
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