from bottle import get, post
from bottle import request, run

from config.config import get_cfg_port
from log.log import log_internal
from resources.global_resources.log_vars import logPass
from resources.lang.enGB.logs import *

from apis.get_config import get_config
from apis.get_ui_index import get_ui_index
from apis.get_ui_config import get_ui_config
from apis.get_ui_resource import get_ui_resource
from apis.get_ui_image import get_ui_image
from apis.get_ui_favicon import get_ui_favicon
from apis.get_ui_module import get_ui_module
from apis.post_ui_modules import post_ui_modules


def start_bottle():

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

    @get('/favicon.ico')
    def api_get_ui_favicon():
        return get_ui_favicon(request)

    @get('/images/<type>/<filename>')
    def api_get_ui_image(type, filename):
        return get_ui_image(request, type, filename)

    @get('/modules/<module>/<filename>')
    def api_get_ui_module(module, filename):
        return get_ui_module(request, module, filename)

    @post('/modules')
    def api_post_ui_config():
        return post_ui_modules(request)

    ################################################################################################

    host = '0.0.0.0'
    port = get_cfg_port()
    run(host=host, port=port, server='paste', debug=True)

    log_internal(logPass, logDescPortListener.format(port=port), description='started')

    ################################################################################################
