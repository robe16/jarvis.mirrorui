echo "Running Build ID: ${env.BUILD_ID}"

string githubUrl = "https://github.com/robe16/jarvis.mirrorui.git"
string workspace = "/var/lib/jenkins/jobs/jarvis.mirrorui/workspace"
String deployLogin

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
        //
        deployLogin = "${params.deploymentUsername}@${params.deploymentServer}"
        //
    }

	if (params["deploymentServer"]!="*" && params["deploymentUsername"]!="*") {

        stage("checkout") {
            git url: "${githubUrl}"
            sh "git rev-parse HEAD > .git/commit-id"
        }

        stage("deploy"){
            //
            String mirrorui_tar = "mirrorui.tar.gz"
            //
            // remove any old tar files from cicd server
            try {
                sh "rm ~/${mirrorui_tar}"
            } catch(error) {
                echo "No ${mirrorui_tar} file to remove."
            }
            //
            // compress folder
            // xfer tar to deploy server
            // uncompress folder to required directory
            // remove the tar file from deploy server
            // remove the tar file from cicd server
            sh """
                cd ${workspace}
                tar czf ~/${mirrorui_tar} 'src/'
                scp -v -o StrictHostKeyChecking=no ~/${mirrorui_tar} ${deployLogin}:~
                ssh -o StrictHostKeyChecking=no ${deployLogin} \"tar xvzf ${mirrorui_tar} -C ~/jarvis.mirrorui/\"
                ssh -o StrictHostKeyChecking=no ${deployLogin} \"rm ~/${mirrorui_tar}\"
                rm ~/${mirrorui_tar}
            ""
            //
        }

        stage("reboot mirror"){
            sh "ssh ${deployLogin} \"sudo sleep 5 ; reboot\""
        }

    } else {
        error("Build cancelled as required parameter values not provided by pipeline configuration")
    }

}