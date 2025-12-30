-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 04, 2025 at 11:55 AM
-- Server version: 10.11.14-MariaDB
-- PHP Version: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cybaemtech_CYB_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `excerpt` text DEFAULT NULL,
  `content` text NOT NULL,
  `status` varchar(20) DEFAULT 'draft',
  `include_in_sitemap` tinyint(1) DEFAULT 1,
  `type` varchar(50) DEFAULT 'Blog Post',
  `author` varchar(100) DEFAULT NULL,
  `author_linkedin` varchar(500) DEFAULT NULL,
  `author_title` varchar(255) DEFAULT NULL,
  `author_photo` varchar(500) DEFAULT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `tags` text DEFAULT NULL,
  `meta_title` varchar(100) DEFAULT NULL,
  `meta_description` varchar(200) DEFAULT NULL,
  `meta_keywords` text DEFAULT NULL,
  `og_title` varchar(100) DEFAULT NULL,
  `og_description` varchar(200) DEFAULT NULL,
  `og_image` varchar(500) DEFAULT NULL,
  `twitter_card_type` varchar(50) DEFAULT 'summary_large_image',
  `canonical_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `status`, `include_in_sitemap`, `type`, `author`, `author_linkedin`, `author_title`, `author_photo`, `featured_image`, `views`, `created_at`, `updated_at`, `tags`, `meta_title`, `meta_description`, `meta_keywords`, `og_title`, `og_description`, `og_image`, `twitter_card_type`, `canonical_url`) VALUES
(25, 'The Ultimate Guide to Computer AMC Services in Pune – Why Your Business Needs Cybaem Tech', 'computer-amc-services-in-pune', 'Learn how Cybaem Tech’s Computer AMC Services help Pune businesses reduce downtime, improve IT performance, and stay secure with SLA-based support, preventive maintenance, and complete IT infrastructure care.\n', '<p><strong class=\"ql-font-serif\">Computer AMC Services in Pune – Why Cybaem Tech Is the Trusted Partner for Businesses in 2026</strong></p><p><br></p><p><span class=\"ql-font-serif\">Every business today depends heavily on computers, laptops, internet connectivity, and IT systems. Whether you run a startup, SME, or an enterprise in Pune, even a small issue like a slow system or network failure can lead to downtime, loss of productivity, and unnecessary repair costs.</span></p><p><br></p><p><strong class=\"ql-font-serif\">This is exactly why Computer AMC (Annual Maintenance Contract)</strong><span class=\"ql-font-serif\"> is no longer optional—it is a necessity. Cybaem Tech provides </span><strong class=\"ql-font-serif\">professional, affordable, and SLA-based Computer AMC services across Pune</strong><span class=\"ql-font-serif\">, helping businesses maintain a stable and high-performing IT environment throughout the year.</span></p><p class=\"ql-align-center\"><br></p><p><strong class=\"ql-font-serif\">What Is Computer AMC and Why It Matters for Pune Businesses?</strong></p><p><span class=\"ql-font-serif\">A Computer AMC is a yearly maintenance plan that ensures your IT systems receive continuous care, regular check-ups, and timely troubleshooting. It protects your business from sudden breakdowns, high repair costs, and operational disruption.</span></p><p><br></p><p><strong class=\"ql-font-serif\">With Cybaem Tech’s AMC, you get:</strong></p><ul><li><span class=\"ql-font-serif\">Regular preventive maintenance</span></li><li><span class=\"ql-font-serif\">Fast onsite visits</span></li><li><span class=\"ql-font-serif\">Instant remote support</span></li><li><span class=\"ql-font-serif\">Hardware &amp; software troubleshooting</span></li><li><span class=\"ql-font-serif\">Antivirus monitoring</span></li><li><span class=\"ql-font-serif\">OS updates and patch management</span></li><li><span class=\"ql-font-serif\">Network speed &amp; stability optimization</span></li></ul><p><br></p><p><span class=\"ql-font-serif\">In Pune’s fast-paced business hubs like Hinjewadi, Baner, Wakad, Kharadi, Magarpatta, Aundh, and PCMC, uninterrupted IT infrastructure is essential for smooth operations. AMC ensures your business never stops due to technical issues.</span></p><p class=\"ql-align-center\"><br></p><p><strong class=\"ql-font-serif\">Why Choose Cybaem Tech for Computer AMC Services in Pune?</strong></p><p><span class=\"ql-font-serif\">Cybaem Tech has earned the trust of Pune-based companies by consistently delivering reliable, fast, and expert IT support. Here’s why businesses prefer us as their AMC partner:</span></p><p><br></p><p><strong class=\"ql-font-serif\">1. SLA-Based Fast Response Time</strong></p><p><span class=\"ql-font-serif\">We guarantee defined response times for every ticket—ensuring that your issues never stay pending for long.</span></p><p><br></p><p><strong class=\"ql-font-serif\">2. Preventive IT Maintenance</strong></p><p><span class=\"ql-font-serif\">Our scheduled check-ups help identify issues before they turn into costly breakdowns.</span></p><p><br></p><p><strong class=\"ql-font-serif\">3. Skilled Hardware &amp; Networking Engineers</strong></p><p><span class=\"ql-font-serif\">Our certified IT engineers resolve issues with accuracy and ensure long-term system stability.</span></p><p><br></p><p><strong class=\"ql-font-serif\">4. Pune-Focused Onsite Support</strong></p><p><span class=\"ql-font-serif\">We cover all major Pune &amp; PCMC locations for quick onsite resolution.</span></p><p><br></p><p><strong class=\"ql-font-serif\">5. Complete IT Infrastructure Coverage</strong></p><p><strong class=\"ql-font-serif\">Our AMC includes:</strong></p><ul><li><span class=\"ql-font-serif\">Desktops &amp; laptops</span></li><li><span class=\"ql-font-serif\">Printers &amp; scanners</span></li><li><span class=\"ql-font-serif\">Routers, switches, WiFi</span></li><li><span class=\"ql-font-serif\">Servers &amp; storage systems</span></li><li><span class=\"ql-font-serif\">Software installation &amp; updates</span></li><li><span class=\"ql-font-serif\">Email &amp; Microsoft 365 support</span></li><li><span class=\"ql-font-serif\">Antivirus configuration &amp; monitoring</span></li></ul><p class=\"ql-align-center\"><br></p><p><strong class=\"ql-font-serif\">Full Scope of Cybaem Tech AMC Services</strong></p><p><strong class=\"ql-font-serif\">Hardware Support</strong></p><ul><li><span class=\"ql-font-serif\">Desktop/laptop repairing</span></li><li><span class=\"ql-font-serif\">Checking RAM, HDD/SSD, PSU</span></li><li><span class=\"ql-font-serif\">Printer/scanner maintenance</span></li><li><span class=\"ql-font-serif\">Motherboard, SMPS, display issues</span></li><li><span class=\"ql-font-serif\">Replacement (parts chargeable)</span></li></ul><p><br></p><p><strong class=\"ql-font-serif\">Software Support</strong></p><ul><li><span class=\"ql-font-serif\">OS installation &amp; updates</span></li><li><span class=\"ql-font-serif\">Microsoft 365 configuration</span></li><li><span class=\"ql-font-serif\">Email setup &amp; troubleshooting</span></li><li><span class=\"ql-font-serif\">Antivirus installation</span></li><li><span class=\"ql-font-serif\">Application support</span></li></ul><p><br></p><p><strong class=\"ql-font-serif\">Network Support</strong></p><ul><li><span class=\"ql-font-serif\">Router/switch configuration</span></li><li><span class=\"ql-font-serif\">WiFi optimization</span></li><li><span class=\"ql-font-serif\">LAN troubleshooting</span></li><li><span class=\"ql-font-serif\">Internet connectivity fixes</span></li><li><span class=\"ql-font-serif\">Firewall &amp; security setup</span></li></ul><p><br></p><p><strong class=\"ql-font-serif\">Security Maintenance</strong></p><ul><li><span class=\"ql-font-serif\">Malware/virus removal</span></li><li><span class=\"ql-font-serif\">Firewall checks</span></li><li><span class=\"ql-font-serif\">Patch updates</span></li><li><span class=\"ql-font-serif\">Backup and recovery recommendations</span></li></ul><p class=\"ql-align-center\"><br></p><p><strong class=\"ql-font-serif\">AMC Plans Offered by Cybaem Tech</strong></p><p><strong class=\"ql-font-serif\">We offer Basic, Standard, and Premium AMC Plans</strong><span class=\"ql-font-serif\">, tailored to business size and IT complexity.</span></p><p><span class=\"ql-font-serif\"> Each plan includes:</span></p><ul><li><span class=\"ql-font-serif\">24/7 remote support</span></li><li><span class=\"ql-font-serif\">Monthly or quarterly health checks</span></li><li><span class=\"ql-font-serif\">Onsite visits as per plan</span></li><li><span class=\"ql-font-serif\">Comprehensive IT monitoring</span></li><li><span class=\"ql-font-serif\">Priority support for critical issues</span></li></ul><p class=\"ql-align-center\"><br></p><p><strong class=\"ql-font-serif\">Why AMC Is More Important in a Growing IT Hub Like Pune</strong></p><p><strong class=\"ql-font-serif\">Pune is one of India’s fastest-growing IT and startup cities.</strong></p><p><strong class=\"ql-font-serif\"> With high dependency on systems, any downtime can cause:</strong></p><ul><li><span class=\"ql-font-serif\">Loss of revenue</span></li><li><span class=\"ql-font-serif\">Decreased employee productivity</span></li><li><span class=\"ql-font-serif\">Delayed client deliveries</span></li><li><span class=\"ql-font-serif\">Higher repair expenses</span></li><li><span class=\"ql-font-serif\">Cybersecurity vulnerabilities</span></li></ul><p><span class=\"ql-font-serif\">Cybaem Tech ensures your business stays secure, stable, and productive at all times.</span></p><p class=\"ql-align-center\"><br></p><p><strong class=\"ql-font-serif\">Frequently Asked Questions </strong></p><p><strong class=\"ql-font-serif\">Q1: How much does Computer AMC cost in Pune?</strong></p><p><span class=\"ql-font-serif\">AMC pricing depends on system count and support level. Cybaem Tech offers affordable and customized plans.</span></p><p><br></p><p><strong class=\"ql-font-serif\">Q2: Does Cybaem Tech provide onsite support?</strong></p><p><span class=\"ql-font-serif\">Yes. Our Pune-based engineers provide fast onsite support across all major areas.</span></p><p><br></p><p><strong class=\"ql-font-serif\">Q3: Which devices are covered under AMC?</strong></p><p><span class=\"ql-font-serif\">Desktops, laptops, printers, routers, switches, WiFi devices, servers, and software systems.</span></p><p><br></p><p><strong class=\"ql-font-serif\">Q4: Does AMC include part replacement?</strong></p><p><span class=\"ql-font-serif\">Servicing is included. Hardware parts are chargeable separately.</span></p><p><br></p><p><strong class=\"ql-font-serif\">Q5: How often do you provide preventive maintenance?</strong></p><p><span class=\"ql-font-serif\">Monthly or quarterly visits depending on the AMC plan.</span></p><p class=\"ql-align-center\"><br></p><p><strong class=\"ql-font-serif\">Conclusion</strong></p><p><span class=\"ql-font-serif\">A dependable Computer AMC service is essential for every business today. Cybaem Tech helps Pune organizations reduce downtime, secure their IT infrastructure, and improve day-to-day performance through quality AMC support.</span></p><p><br></p><p><strong class=\"ql-font-serif\">If you\'re looking for a reliable and professional Computer AMC Service Provider in Pune</strong><span class=\"ql-font-serif\">, Cybaem Tech is the trusted partner your business needs.</span></p>', 'published', 1, 'Blog Post', 'Rohan Bhosale', 'https://www.linkedin.com/in/rohanbhosale15/', 'CEO @ CybaemTech', '/lovable-uploads/69272a45d837f.jpg', '/lovable-uploads/6927f56f1d7bb.png', 85, '2025-11-24 06:12:35', '2025-12-04 06:16:55', 'Computer AMC, IT Maintenance, Pune IT Support, Cybaem Tech Services, Annual Maintenance Contract, IT Infrastructure, Remote IT Support, Managed IT Services', 'computer-amc-services-in-pune', 'computer-amc-services-in-punecomputer-amc-services-in-pune', 'Computer AMC, IT Maintenance, Pune IT Support, ', 'Computer AMC, IT Maintenance, Pune IT Support, ', 'Computer AMC, IT Maintenance, Pune IT Support, ', '/lovable-uploads/6927f56f1d7bb.png', 'summary', '/lovable-uploads/6927f56f1d7bb.png'),
(31, 'ganesh', 'ganesh', ', IT Maintenance, Pune IT Support, Cybaem Tech Services, Annual Maintenance Contract, IT Infrastructure, Remote IT Support, Managed IT Services', '<h1>IT Maintenance, Pune IT Support, Cybaem Tech </h1><h4><br></h4><h4>Services, Annual Maintenance Contract, IT Infrastructure, Remote IT Support, Manage</h4><p><br></p><p><br></p><p><br></p><p>, IT Maintenance, Pune IT Support, Cybaem Tech Services, Annual Maintenance Contract, IT Infrastructure, Remote IT Support, Managed IT Services</p><p><br></p><p><br></p><p>, IT Maintenance, Pune IT Support, Cybaem Tech Services, Annual Maintenance Contract, IT Infrastructure, Remote IT Support, Managed IT Servicesd IT Services</p>', 'published', 1, 'Blog Post', 'admin (Rohan bhosale)', 'https://www.linkedin.com/in/yash-bhalekar-4366b3277/', 'CEO @ CybaemTech', 'https://t-imoexo.com/server/uploads/author_ai-global-event_1763370096.jpg', 'https://t-imoexo.com/server/uploads/Media (13)_1763360271.jpeg', 1, '2025-12-04 06:23:23', '2025-12-04 06:23:32', 'Computer AMC', 'computer-amc-services-in-pune', ', IT Maintenance, Pune IT Support, Cybaem Tech Services, Annual Maintenance Contract, IT Infrastructure, Remote IT Support, Managed IT Services', 'Computer AMC, IT Maintenance, Pune IT Support, ', 'Computer AMC, IT Maintenance, Pune IT Support, ', ', IT Maintenance, Pune IT Support, Cybaem Tech Services, Annual Maintenance Contract, IT Infrastructure, Remote IT Support, Managed IT Services', '/lovable-uploads/6927f56f1d7bb.png', 'summary_large_image', '/lovable-uploads/6927f56f1d7bb.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_blog_posts_slug` (`slug`),
  ADD KEY `idx_blog_posts_tags` (`tags`(3072)),
  ADD KEY `idx_blog_created` (`created_at`),
  ADD KEY `idx_blog_slug` (`slug`),
  ADD KEY `idx_blog_author_photo` (`author_photo`),
  ADD KEY `idx_blog_sitemap` (`include_in_sitemap`,`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
