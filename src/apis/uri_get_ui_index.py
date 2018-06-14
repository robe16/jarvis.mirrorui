import os
from bottle import HTTPResponse, HTTPError

from apis.log_arguments import _get_log_args
from apis.cors import enable_cors
from resources.global_resources.log_vars import logPass, logFail, logException
from resources.global_resources.variables import *
from log.log import log_inbound


def get_ui_index(request):
    #
    args = _get_log_args(request)
    #
    try:
        with open(os.path.join(os.path.dirname(__file__), '..', 'webfiles/index.html'), 'r') as f:
            page_body = f.read()
        #
        status = httpStatusSuccess
        args['result'] = logPass
        #
        args['http_response_code'] = status
        args['description'] = '-'
        log_inbound(**args)
        #
        response = HTTPResponse()
        response.status = status
        response.body = page_body
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
        raise HTTPError(status)