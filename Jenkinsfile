pipeline {
    agent any

    stages {

        stage('Test') {
            agent {
                docker {
                   image 'node:20-alpine'
                   reuseNode true
                 }
            }
            steps {
                sh '''
                    npm install
                    npm test
                '''
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:20-alpine'
                    reuseNode true
                 }
            }
            steps {
                sh '''
                    npm install
                    npm run build
                '''
            }
        }

        stage('Build My Docker Image') {
            steps {
                script {
                    sh '''
                        docker build -t react-cicd:${BUILD_NUMBER} .
                         docker tag react-cicd:${BUILD_NUMBER} react-cicd:latest
                    '''
                }
            }
        }

        stage('Deploy to AWS ECS'){
            agent{
                docker{
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '-u root --entrypoint=""'
                }
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'ProjectUserKey', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) 
                {
                    sh '''
                        aws --version

                        yum install jq -y

                        LATEST_TD_REVISION=$(aws ecs register-task-definition --cli-input-json file://aws/task-definition.json | jq '.taskDefinition.revision')
                        aws ecs update-service --cluster react-cicd-cluster-1416 --service react-cicd-service-1416 --task-definition react-cicd-task:$LATEST_TD_REVISION
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Build and tests succeeded!'
        }
        failure {
            echo 'Build or tests failed.'
        }
        always {
            echo 'Pipeline finished.'
        }
    }
}