pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Show Project Structure') {
            steps {
                sh '''
                    echo "Current directory:"
                    pwd

                    echo "Files:"
                    ls -la

                    echo "Frontend:"
                    ls -la frontend || true

                    echo "Backend:"
                    ls -la backend || true

                    echo "Database:"
                    ls -la base || true
                '''
            }
        }
    }
}