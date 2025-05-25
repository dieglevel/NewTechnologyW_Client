pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
        APP_NAME = 'my-next-app'        // Thư mục chứa mã nguồn ứng dụng Next.js
        PM2_APP_NAME = 'nextjs-app'     // Tên process PM2
    }

    stages {
        stage('Clone Code') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${env.APP_NAME}") {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Copy .env file') {
            steps {
                dir("${env.APP_NAME}") {
                    echo 'Copying .env file using Config File Provider plugin...'
                    configFileProvider([
                        configFile(
                            fileId: 'Web-ENV', 
                            targetLocation: '.env'
                        )
                    ]) {
                        sh 'echo ".env file content:" && cat .env'
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
                        // Dừng app cũ nếu đang chạy
                        sh "pm2 delete ${env.PM2_APP_NAME} || true"
                        // Chạy app mới
                        sh "pm2 start npm --name \"${env.PM2_APP_NAME}\" -- run start"
                        // Lưu cấu hình PM2
                        sh 'pm2 save'
                        // Hiển thị trạng thái
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
