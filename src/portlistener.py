import threading

from bottle import get
from bottle import request, run

from config.config import get_cfg_port_listener
from log.log import log_internal
from resources.global_resources.log_vars import logPass
from resources.lang.enGB.logs import *

from apis.get_config import get_config
from apis.get_ui_index import get_ui_index
from apis.get_ui_config import get_ui_config
from apis.get_ui_resource import get_ui_resource
from apis.get_ui_module import get_ui_module


def start_bottle(port_threads):

    ################################################################################################
    # Create device
    ################################################################################################

    log_internal(logPass, logDescDeviceObjectCreation, description='success')

    ################################################################################################
    # APIs
    ################################################################################################

    @get('/config')
    def api_get_config():
        return get_config(request)

    @get('/')
    def api_get_ui_index():
        return get_ui_index(request)

    @get('/config/config.js')
    def api_get_ui_config():
        return get_ui_config(request)

    @get('/static/<type>/<filename>')
    def api_get_ui_resource(type, filename):
        return get_ui_resource(request, type, filename)

    @get('/services/<service>/<filename>')
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
