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
                dir('react-cicd'){ // Change to the react-cicd directory
                  sh '''
                  npm install
                  npm test
                 '''
                }
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
                dir('react-cicd') {
                  sh '''
                    npm install
                    npm run build
                  '''
               }
            }
        }

        stage('Build My Docker Image') {
            steps {
                dir('react-cicd') {
                    script {
                        sh '''
                            docker build -t react-cicd:${BUILD_NUMBER} .
                            docker tag react-cicd:${BUILD_NUMBER} react-cicd:latest
                        '''
                    }
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