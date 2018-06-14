import os
from bottle import static_file, HTTPResponse

from apis.log_arguments import _get_log_args
from apis.cors import enable_cors
from resources.global_resources.log_vars import logPass, logFail, logException
from resources.global_resources.variables import *
from log.log import log_inbound


def get_ui_module(request, service, file):
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
        root = os.path.join(os.path.dirname(__file__), '..', 'webfiles/services/{service}'.format(service=service))
        #
        response = static_file(file, root=root)
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