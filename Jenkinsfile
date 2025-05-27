pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        APP_NAME = 'my-next-app'        // Thư mục chứa mã nguồn ứng dụng Next.js
        PM2_APP_NAME = 'nextjs-app'     // Tên process trong PM2
        ENV_FILE_ID = 'Web-ENV' // ID file .env trong Jenkins
    }

    stages {
        stage('Clone Code') {
            steps {
                echo '📥 Cloning repository...'
                checkout scm
            }
        }

        stage('Save Old Dependency Hash') {
            steps {
                dir("${env.APP_NAME}") {
                    script {
                        echo '📦 Saving old package-lock.json hash (if any)...'
                        sh '''
                            if [ -f package-lock.json ]; then
                                md5sum package-lock.json > old.hash
                            else
                                echo "no-lock-file" > old.hash
                            fi
                        '''
                    }
                }
            }
        }

        stage('Copy .env file') {
            steps {
                dir("${env.APP_NAME}") {
                    echo '🔐 Copying .env file from Jenkins Config File Provider...'
                    configFileProvider([
                        configFile(fileId: "${env.ENV_FILE_ID}", targetLocation: '.env')
                    ]) {
                        sh 'echo "✅ .env file content:" && cat .env'
                    }
                }
            }
        }

        stage('Check Dependency Changes & Install if Needed') {
            steps {
                dir("${env.APP_NAME}") {
                    script {
                        echo '🔍 Checking if package-lock.json has changed...'

                        sh 'md5sum package-lock.json > new.hash || echo "no-lock-file" > new.hash'

                        def changed = sh(
                            script: 'diff old.hash new.hash > /dev/null || echo "changed"',
                            returnStdout: true
                        ).trim()

                        if (changed == "changed") {
                            echo '📦 Detected change in dependencies, running npm install...'
                            sh 'npm install'
                        } else {
                            echo '✅ Dependencies unchanged, skipping npm install.'
                        }
                    }
                }
            }
        }

        stage('Build App') {
            steps {
                dir("${env.APP_NAME}") {
                    echo '🛠️ Building the Next.js app...'
                    sh 'npm run build'
                }
            }
        }

        stage('Start with PM2') {
            steps {
                dir("${env.APP_NAME}") {
                    script {
                        echo '🚀 Starting the app using PM2...'

                        sh "pm2 delete ${env.PM2_APP_NAME} || true"
                        sh "pm2 start npm --name \"${env.PM2_APP_NAME}\" -- run start"
                        sh 'pm2 save'
                        sh 'pm2 status'
                    }
                }
            }
        }
    }

    post {
        failure {
            echo '❌ Build or deployment failed.'
        }
        success {
            echo '✅ App deployed successfully using PM2.'
        }
    }
}
