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

from apis.uri_config import get_config
from apis.uri_get_ui_index import get_ui_index
from apis.uri_get_ui_config import get_ui_config
from apis.uri_get_ui_resource import get_ui_resource
from apis.uri_get_ui_module import get_ui_module


def start_bottle(port_threads):

    ################################################################################################
    # Create device
    ################################################################################################

    log_internal(logPass, logDescDeviceObjectCreation, description='success')

    ################################################################################################
    # APIs
    ################################################################################################

    @get(uri_config)
    def api_get_config():
        return get_config(request)

    @get(uri_get_ui_index)
    def api_get_ui_index():
        return get_ui_index(request)

    @get(uri_get_ui_config)
    def api_get_ui_config():
        return get_ui_config(request)

    @get(uri_get_ui_resource)
    def api_get_ui_resource(type, filename):
        return get_ui_resource(request, type, filename)

    @get(uri_get_ui_module)
    def api_get_ui_module(service, filename):
        return get_ui_module(request, service, filename)

    ################################################################################################

    def bottle_run(x_host, x_port):
        log_internal(logPass, logDescPortListener.format(port=x_port), description='started')
        run(host=x_host, port=x_port, debug=True)

    ################################################################################################

    host = '0.0.0.0'
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
