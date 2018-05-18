echo "Running Build ID: ${env.BUILD_ID}"

string githubUrl = "https://github.com/robe16/jarvis.mirrorui.git"
string serviceID = "jarvis.mirrorui"
string serviceType = "mirrorui"
String build_args
String deployLogin
String docker_img_name
def docker_img

node {

    deleteDir()

    stage("parameters") {
        //
        // Parameters passed through from the Jenkins Pipeline configuration
        //
        string(name: 'deploymentServer',
               description: 'Server to deploy the files to',
               defaultValue: '*')
        string(name: 'deploymentUsername',
               description: 'Username for the server the files will be deployed to (used for ssh/scp)',
               defaultValue: '*')
        string(name: 'fileConfig',
               description: 'Location of config file on host device',
               defaultValue: '*')
        //
        build_args = [""].join(" ")
        //
        //
        docker_volumes = ["-v ${params.fileConfig}:/jarvis/${serviceType}/config/config.json"].join(" ")
        //
        deployLogin = "${params.deploymentUsername}@${params.deploymentServer}"
        //
    }

	if (params["deploymentServer"]!="*" && params["deploymentUsername"]!="*") {

        stage("checkout") {
            git url: "${githubUrl}"
            sh "git rev-parse HEAD > .git/commit-id"
        }

        docker_img_name_build_id = "${serviceID}:${env.BUILD_ID}"
        docker_img_name_latest = "${serviceID}:latest"

        stage("build") {
            try {sh "docker image rm ${docker_img_name_latest}"} catch (error) {}
            sh "docker build -t ${docker_img_name_build_id} ${build_args} ."
            sh "docker tag ${docker_img_name_build_id} ${docker_img_name_latest}"
        }

        stage("deploy"){
            //
            String docker_img_tar = "docker_img.tar"
            //
            try {
                // remove any old tar files from cicd server
                sh "rm ~/${docker_img_tar}"
            } catch(error) {
                echo "No ${docker_img_tar} file to remove."
            }
            // create tar file of image
            sh "docker save -o ~/${docker_img_tar} ${docker_img_name_build_id}"
            // xfer tar to deploy server
            sh "scp -v -o StrictHostKeyChecking=no ~/${docker_img_tar} ${deployLogin}:~"
            // load tar into deploy server registry
            sh "ssh -o StrictHostKeyChecking=no ${deployLogin} \"docker load -i ~/${docker_img_tar}\""
            // remove the tar file from deploy server
            sh "ssh -o StrictHostKeyChecking=no ${deployLogin} \"rm ~/${docker_img_tar}\""
            // remove the tar file from cicd server
            sh "rm ~/${docker_img_tar}"
            // Set 'latest' tag to most recently created docker image
            sh "ssh -o StrictHostKeyChecking=no ${deployLogin} \"docker tag ${docker_img_name_build_id} ${docker_img_name_latest}\""
            //
        }

        stage("start container"){
            // Stop existing container if running
            sh "ssh ${deployLogin} \"docker rm -f ${serviceID} && echo \"container ${serviceID} removed\" || echo \"container ${serviceID} does not exist\"\""
            // Start new container
            sh "ssh ${deployLogin} \"docker run --restart unless-stopped -d ${docker_volumes} --net=host --name ${serviceID} ${docker_img_name_latest}\""
        }

        stage("reboot mirror"){
            //sh "ssh ${deployLogin} \"sudo reboot\""
            //sh "ssh ${deployLogin} \"sudo shutdown -r\""
        }

    } else {
        error("Build cancelled as required parameter values not provided by pipeline configuration")
    }

}