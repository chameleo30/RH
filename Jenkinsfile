pipeline {
    agent any

    tools {
        nodejs 'NodeJS_20'
        maven 'Maven_3'
        // jdk 'JDK_21' // active seulement si tu l'as configuré dans Jenkins Tools
    }

    stages {
        stage('Verify Tools') {
            steps {
                sh '''
                    echo "===== GIT ====="
                    git --version || true
                    which git || true

                    echo "===== NODE ====="
                    node -v || true
                    npm -v || true
                    which node || true
                    which npm || true

                    echo "===== JAVA ====="
                    java -version || true
                    echo "JAVA_HOME=$JAVA_HOME"
                    which java || true

                    echo "===== MAVEN ====="
                    mvn -v || true
                    echo "MAVEN_HOME=$MAVEN_HOME"
                    which mvn || true

                    echo "===== MYSQL CLIENT ====="
                    mysql --version || true
                    mariadb --version || true
                    which mysql || true
                    which mariadb || true
                '''
            }
        }
    }
}