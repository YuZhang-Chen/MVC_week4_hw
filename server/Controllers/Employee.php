<?php
require_once './DB.php';

class Employee {
    public function getUsers() {
        $response = DB();
        if ($response['status'] == 200) {
            $conn = $response['result'];
            if (isset($_POST['id'])) {
                $id = $_POST['id'];
                $sql = "SELECT * FROM user WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $result = $stmt->execute([$id]);
            } else {
                $sql = "SELECT * FROM user";
                $stmt = $conn->prepare($sql);
                $result = $stmt->execute();
            }
        }
        if ($result) {
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $this->respone(200, '查詢成功', $rows);
        } else {
            return $this->respone(400, 'SQL錯誤');
        }
    }

    public function newUser() {
        if (isset($_POST['id'], $_POST['password'], $_POST['email'], $_POST['phone']) && !empty($_POST['id'])) {
            $id = $_POST['id'];
            $password = $_POST['password'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];

            $response = DB();
            try {
                if ($response['status'] == 200) {
                    $conn = $response['result'];
                    $sql = "INSERT INTO `user` (`id`, `password`, `email`, `phone`) VALUES (?, ?, ?, ?)";
                    $stmt = $conn->prepare($sql);
                    $result = $stmt->execute([$id, $password, $email, $phone]);

                    if ($result) {
                        return $this->respone(200, '新增成功');
                    } else {
                        return $this->respone(400, 'SQL錯誤');
                    }
                }
            } catch (PDOException $e) {
                return $this->respone(500, '伺服器錯誤: ' . $e->getMessage());
            }
        } else {
            return $this->respone(400, 'ID為必要輸入');
        }
    }

    public function removeUser() {
        if (isset($_POST['id'])) {
            $id = $_POST['id'];
            $response = DB();
            if ($response['status'] == 200) {
                $conn = $response['result'];
                $sql = "DELETE FROM user WHERE id = ?";
                $stmt = $conn->prepare($sql);
                $result = $stmt->execute([$id]);

                if ($stmt->rowCount() > 0 ) {
                    if ($result) {
                        return $this->respone(200, '刪除成功');
                    } else {
                        return $this->respone(400, 'SQL錯誤');
                    }
                } else {
                    return $this->respone(204, '刪除失敗');
                }
            }
        }
    }
    
    public function updateUser() {
        if (isset($_POST['id'], $_POST['password'], $_POST['email'], $_POST['phone'])) {
            $id = $_POST['id'];
            $password = $_POST['password'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];

            $response = DB();
            try {
                if ($response['status'] == 200) {
                    $conn = $response['result'];
                    $sql = "UPDATE `user` SET `password` = ?, `email` = ?, `phone` = ? WHERE `id` = ?";
                    $stmt = $conn->prepare($sql);
                    $result = $stmt->execute([$password, $email, $phone, $id]);

                    if ($result) {
                        if ($stmt->rowCount() == 1) {
                            return $this->respone(200, '更新成功');
                        } else {
                            return $this->respone(400, '更新失敗');
                        }
                    } else {
                        return $this->respone(400, 'SQL錯誤');
                    }
                }
            } catch (PDOException $e) {
                return $this->respone(500, '伺服器錯誤: ' . $e->getMessage());
            }
        }
    }

    private function respone($status, $message, $result=null) {
        return ['status' => $status, 'message' => $message, 'result' => $result];
    }
}