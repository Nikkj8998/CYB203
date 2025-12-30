-- Create gallery table for Life at CybaemTech celebrations
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'celebration',
    display_order INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add index for better performance
CREATE INDEX idx_gallery_status ON gallery(status);
CREATE INDEX idx_gallery_order ON gallery(display_order);

-- Insert some default gallery items
INSERT INTO gallery (title, image_url, category, display_order, status) VALUES
('Independence Day Celebration', '/uploads/post3.jpeg', 'celebration', 1, 'active'),
('Team Outing', '/uploads/post2.jpeg', 'celebration', 2, 'active'),
('Annual Function', '/uploads/post1.jpg', 'celebration', 3, 'active'),
('Makar Sankranti Celebration', '/uploads/sankranti2.jpg', 'celebration', 4, 'active'),
('Christmas Celebration', '/uploads/christmas.jpg', 'celebration', 5, 'active'),
('Ganesh Chaturthi Celebration', '/uploads/ganpati1.jpg', 'celebration', 6, 'active'),
('Diwali Celebration', '/uploads/diwali.jpg', 'celebration', 7, 'active'),
('Team Outing', '/uploads/trip.jpg', 'celebration', 8, 'active');
