<?php
class LeadsDatabase {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    public $conn;

    public function __construct() {
        $this->loadEnvFile();
        
        // Prefer LEADS_* environment variables, but fall back to common cPanel/legacy vars
        $this->host = trim(getenv('LEADS_DB_HOST') ?: getenv('CPANEL_DB_HOST') ?: getenv('DB_HOST') ?: 'localhost');
        $this->db_name = trim(getenv('LEADS_DB_NAME') ?: getenv('CPANEL_DB_NAME') ?: getenv('DB_DATABASE') ?: '');
        $this->username = trim(getenv('LEADS_DB_USER') ?: getenv('CPANEL_DB_USER') ?: getenv('DB_USERNAME') ?: '');
        $this->password = trim(getenv('LEADS_DB_PASSWORD') ?: getenv('CPANEL_DB_PASSWORD') ?: getenv('DB_PASSWORD') ?: '');
        $this->port = trim(getenv('LEADS_DB_PORT') ?: getenv('CPANEL_PORT') ?: getenv('DB_PORT') ?: '3306');
    }
    
    private function loadEnvFile() {
        $envFile = __DIR__ . '/../.env';
        
        if (file_exists($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            foreach ($lines as $line) {
                if (strpos(trim($line), '#') === 0) {
                    continue;
                }
                
                if (strpos($line, '=') !== false) {
                    list($key, $value) = explode('=', $line, 2);
                    $key = trim($key);
                    $value = trim($value);
                    
                    if (!getenv($key)) {
                        putenv("$key=$value");
                    }
                }
            }
        }
    }

    public function getConnection() {
        $this->conn = null;

        try {
            if ($this->host && $this->db_name && $this->username) {
                $dsn = "mysql:host=" . $this->host . 
                       ";port=" . $this->port . 
                       ";dbname=" . $this->db_name;
                
                $this->conn = new PDO($dsn, $this->username, $this->password);
                $this->conn->exec("set names utf8");
            } else {
                throw new PDOException("Leads database configuration not found");
            }
            
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            error_log("Leads DB Connection error: " . $exception->getMessage());
            throw $exception;
        }

        return $this->conn;
    }
}
?>
