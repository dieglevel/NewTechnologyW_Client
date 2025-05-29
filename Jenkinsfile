pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                // Lấy code từ repository (Git)
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Cài đặt dependencies
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Build dự án Next.js
                sh 'npm run build'
            }
        }

        stage('PM2 Restart') {
            steps {
                script {
                    // Tắt app cũ nếu có
                    sh 'pm2 delete next-app || true'

                    // Start app mới
                    sh 'pm2 start npm --name "next-app" -- run start'
                }
            }
        }
    }

    post {
        failure {
            echo 'Build failed!'
        }
        success {
            echo 'Build and deployment completed successfully!'
        }
    }
}
