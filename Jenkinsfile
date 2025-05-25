pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        APP_NAME = 'my-next-app'        // Tên thư mục chứa source code Next.js
        PM2_APP_NAME = 'nextjs-app'     // Tên process PM2
        ENV_FILE_ID = 'Web-ENV' // ID file .env trong Jenkins config
    }

    stages {
        stage('Clone Code') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Check Dependency Change') {
            steps {
                dir("${env.APP_NAME}") {
                    script {
                        echo 'Checking for changes in package-lock.json...'

                        // Lưu checksum hiện tại (nếu có) để so sánh
                        sh 'if [ -f package-lock.json ]; then md5sum package-lock.json > old.hash || true; fi'
                    }
                }
            }
        }

        stage('Copy .env file') {
            steps {
                dir("${env.APP_NAME}") {
                    echo 'Copying .env file using Config File Provider plugin...'
                    configFileProvider([
                        configFile(fileId: "${env.ENV_FILE_ID}", targetLocation: '.env')
                    ]) {
                        sh 'echo ".env file content:" && cat .env'
                    }
                }
            }
        }

        stage('Install Dependencies If Needed') {
            steps {
                dir("${env.APP_NAME}") {
                    script {
                        // Lấy checksum mới sau khi pull mã mới
                        sh 'md5sum package-lock.json > new.hash'

                        def changed = sh(
                            script: 'diff old.hash new.hash > /dev/null || echo "changed"',
                            returnStdout: true
                        ).trim()

                        if (changed == "changed") {
                            echo 'Detected change in dependencies, running npm install...'
                            sh 'npm install'
                        } else {
                            echo 'No change in package-lock.json, skipping npm install.'
                        }
                    }
                }
            }
        }

        stage('Build App') {
            steps {
                dir("${env.APP_NAME}") {
                    echo 'Building the Next.js app...'
                    sh 'npm run build'
                }
            }
        }

        stage('Start with PM2') {
            steps {
                dir("${env.APP_NAME}") {
                    script {
                        echo 'Starting app with PM2...'

                        // Xóa process cũ nếu tồn tại
                        sh "pm2 delete ${env.PM2_APP_NAME} || true"

                        // Chạy app bằng npm run start (Next.js production)
                        sh "pm2 start npm --name \"${env.PM2_APP_NAME}\" -- run start"

                        // Lưu cấu hình PM2
                        sh 'pm2 save'
                        sh 'pm2 status'
                    }
                }
            }
        }
    }

    post {
        failure {
            echo '❌ Build or deploy failed.'
        }
        success {
            echo '✅ App deployed successfully using PM2.'
        }
    }
}
