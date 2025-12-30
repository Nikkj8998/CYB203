<?php
class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $port;
    public $conn;

    public function __construct() {
        $this->host = getenv('CPANEL_DB_HOST') ?: getenv('DB_HOST');
        $this->db_name = getenv('CPANEL_DB_NAME') ?: getenv('DB_DATABASE');
        $this->username = getenv('CPANEL_DB_USER') ?: getenv('DB_USERNAME');
        $this->password = getenv('CPANEL_DB_PASSWORD') ?: getenv('DB_PASSWORD');
        $this->port = getenv('CPANEL_PORT') ?: '3306';
    }

    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host=" . $this->host . 
                   ";port=" . $this->port . 
                   ";dbname=" . $this->db_name;
            
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            error_log("Connection error: " . $exception->getMessage());
            throw $exception;
        }

        return $this->conn;
    }
}
?>
