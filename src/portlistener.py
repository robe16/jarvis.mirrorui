import threading
import os
from datetime import datetime

from bottle import HTTPError
from bottle import get, post
from bottle import request, run, HTTPResponse, static_file

from common_functions.query_to_string import convert_query_to_string
from config.config import get_cfg_port_listener
from config.config import get_cfg_serviceid, get_cfg_name_long, get_cfg_name_short, get_cfg_groups, get_cfg_subservices
from config.config import get_cfg_details_modules
from log.log import log_inbound, log_internal, log_outbound
from resources.global_resources.exposed_apis import *
from resources.global_resources.log_vars import logPass, logFail, logException
from resources.global_resources.variables import *
from resources.lang.enGB.logs import *


def start_bottle(port_threads):

    ################################################################################################
    # Create device
    ################################################################################################

    log_internal(logPass, logDescDeviceObjectCreation, description='success')

    ################################################################################################
    # Enable cross domain scripting
    ################################################################################################

    def enable_cors(response):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET'
        response.headers['Access-Control-Allow-Headers'] = service_header_clientid_label
        return response

    ################################################################################################
    # Log arguments
    ################################################################################################

    def _get_log_args(request):
        #
        urlparts = request.urlparts
        #
        try:
            client_ip = request.headers['X-Forwarded-For']
        except:
            client_ip = request['REMOTE_ADDR']
        #
        try:
            server_ip = request.headers['X-Real-IP']
        except:
            server_ip = urlparts.hostname
        #
        try:
            client_user = request.headers[service_header_clientid_label]
        except:
            client_user = request['REMOTE_ADDR']
        #
        server_request_query = convert_query_to_string(request.query) if request.query_string else '-'
        server_request_body = request.body.read() if request.body.read()!='' else '-'
        #
        return {'client_ip': client_ip,
                'client_user': client_user,
                'server_ip': server_ip,
                'server_thread_port': urlparts.port,
                'server_method': request.method,
                'server_request_uri': urlparts.path,
                'server_request_query': server_request_query,
                'server_request_body': server_request_body}

    ################################################################################################
    # Service info & Groups
    ################################################################################################

    @get(uri_config)
    def get_config():
        #
        args = _get_log_args(request)
        #
        try:
            #
            data = {'service_id': get_cfg_serviceid(),
                    'name_long': get_cfg_name_long(),
                    'name_short': get_cfg_name_short(),
                    'subservices': get_cfg_subservices(),
                    'groups': get_cfg_groups()}
            #
            status = httpStatusSuccess
            #
            args['result'] = logPass
            args['http_response_code'] = status
            args['description'] = '-'
            log_inbound(**args)
            #
            return HTTPResponse(body=data, status=status)
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

    ################################################################################################
    # Index
    ################################################################################################

    @get(uri_get_ui_index)
    def get_ui_index():
        #
        args = _get_log_args(request)
        #
        try:
            with open(os.path.join(os.path.dirname(__file__), 'webfiles/index.html'), 'r') as f:
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

    ################################################################################################
    # config.js
    ################################################################################################

    @get(uri_get_ui_config)
    def get_ui_config():
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
            raise HTTPError(status)

    ################################################################################################
    # Resources
    ################################################################################################

    @get(uri_get_ui_resource)
    def get_ui_resource(type, file):
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
            response = static_file(file, root='webfiles/static/{type}'.format(type=type))
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
            raise HTTPError(status)

    ################################################################################################
    # Modules
    ################################################################################################

    @get(uri_get_ui_module)
    def get_ui_module(service, file):
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
            response = static_file(file, root='webfiles/services/{service}'.format(service=service))
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
            raise HTTPError(status)

    ################################################################################################
    # -
    ################################################################################################

    # @get(uri_get_x)
    # def get_x(option):
    #     #
    #     args = _get_log_args(request)
    #     #
    #     try:
    #         #
    #         if option == str_calendar_events:
    #             data = {str_calendar_events: _icloud.get_events()}
    #         elif option == str_calendar_birthdays:
    #             data = {str_calendar_birthdays: _icloud.get_birthdays()}
    #         else:
    #             data = False
    #         #
    #         if not bool(data):
    #             status = httpStatusFailure
    #             args['result'] = logFail
    #         else:
    #             status = httpStatusSuccess
    #             args['result'] = logPass
    #         #
    #         args['http_response_code'] = status
    #         args['description'] = '-'
    #         log_inbound(**args)
    #         #
    #         response = HTTPResponse()
    #         response.status = status
    #         enable_cors(response)
    #         #
    #         if not isinstance(data, bool):
    #             response.body = data
    #         #
    #         return response
    #         #
    #     except Exception as e:
    #         #
    #         status = httpStatusServererror
    #         #
    #         args['result'] = logException
    #         args['http_response_code'] = status
    #         args['description'] = '-'
    #         args['exception'] = e
    #         log_inbound(**args)
    #         #
    #         raise HTTPError(status)

    ################################################################################################

    def bottle_run(x_host, x_port):
        log_internal(logPass, logDescPortListener.format(port=x_port), description='started')
        run(host=x_host, port=x_port, debug=True)

    ################################################################################################

    host = 'localhost'
    ports = get_cfg_port_listener()
    for port in ports:
        t = threading.Thread(target=bottle_run, args=(host, port,))
        port_threads.append(t)

    # Start all threads
    for t in port_threads:
        t.start()
    # Use .join() for all threads to keep main process 'alive'
    for t in port_threads:
        t.join()
