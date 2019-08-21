-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 09, 2019 at 08:17 PM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `519ohana`
--

-- --------------------------------------------------------

--
-- Table structure for table `babies`
--

CREATE TABLE `babies` (
  `babies` mediumint(9) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `babies`
--

INSERT INTO `babies` (`babies`, `name`, `dob`, `gender`) VALUES
(1, 'Emily', '2019-08-24', 'female');

-- --------------------------------------------------------

--
-- Table structure for table `baby_entries`
--

CREATE TABLE `baby_entries` (
  `id` mediumint(9) NOT NULL,
  `baby_id` mediumint(9) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `started_at` timestamp NULL DEFAULT NULL,
  `finished_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date` date DEFAULT NULL,
  `entry_type` enum('feedings','naps','changes') COLLATE utf8_unicode_ci NOT NULL,
  `other_info` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `baby_entries`
--

INSERT INTO `baby_entries` (`id`, `baby_id`, `user_id`, `started_at`, `finished_at`, `date`, `entry_type`, `other_info`) VALUES
(1, 1, 1, NULL, '2019-08-03 13:10:18', '2019-08-03', 'feedings', '{}'),
(2, 1, 1, '2019-08-03 06:38:16', '2019-08-03 16:28:17', '2019-08-03', 'naps', '{}'),
(3, 1, 3, NULL, '2019-08-03 17:12:22', NULL, 'changes', '2'),
(4, 1, 3, '2019-08-03 13:18:41', '2019-08-03 21:31:38', '2019-08-03', 'naps', '{}'),
(5, 1, 2, NULL, '2019-08-03 22:06:21', '2019-08-03', 'changes', '1'),
(6, 1, 2, NULL, '2019-08-04 00:20:28', '2019-08-03', 'changes', '1'),
(7, 1, 1, NULL, '2019-08-04 11:12:03', '2019-08-04', 'feedings', '{}'),
(8, 1, 1, '2019-08-04 07:15:28', '2019-08-04 19:24:15', '2019-08-04', 'naps', '{}'),
(9, 1, 3, NULL, '2019-08-04 20:10:34', '2019-08-04', 'changes', '2'),
(10, 1, 2, NULL, '2019-08-04 22:12:00', '2019-08-04', 'feedings', '{}'),
(11, 1, 3, '2019-08-04 18:18:28', '2019-08-05 05:44:28', '2019-08-04', 'naps', '{}'),
(12, 1, 1, NULL, '2019-08-05 14:06:15', '2019-08-05', 'feedings', '{}'),
(13, 1, 2, '2019-08-05 08:14:17', '2019-08-05 17:15:24', '2019-08-05', 'naps', '{}'),
(14, 1, 2, NULL, '2019-08-05 18:14:10', '2019-08-05', 'feedings', '{}'),
(15, 1, 3, '2019-08-05 13:10:00', '2019-08-05 23:17:33', '2019-08-05', 'naps', '{}'),
(16, 1, 1, NULL, '2019-08-06 00:07:22', '2019-08-05', 'changes', '2'),
(17, 1, 2, NULL, '2019-08-06 00:07:27', '2019-08-05', 'changes', '1'),
(18, 1, 1, NULL, '2019-08-06 01:19:24', '2019-08-05', 'feedings', '{}'),
(19, 1, 2, '2019-08-05 19:12:01', '2019-08-06 11:20:56', '2019-08-06', 'naps', '{}'),
(20, 1, 2, NULL, '2019-08-06 11:23:07', '2019-08-06', 'feedings', '{}'),
(21, 1, 2, '2019-08-06 05:22:19', '2019-08-06 18:17:31', '2019-08-06', 'naps', '{}'),
(22, 1, 1, NULL, '2019-08-06 19:09:24', '2019-08-06', 'changes', '2'),
(23, 1, 1, NULL, '2019-08-06 20:18:26', '2019-08-06', 'feedings', '{}'),
(24, 1, 3, NULL, '2019-08-07 01:28:32', '2019-08-06', 'feedings', '{}'),
(25, 1, 1, '2019-08-06 19:50:23', '2019-08-07 14:29:23', '2019-08-07', 'naps', '{}'),
(26, 1, 2, NULL, '2019-08-07 14:32:16', '2019-08-07', 'feedings', '{}'),
(27, 1, 3, NULL, '2019-08-07 16:06:13', '2019-08-07', 'changes', '2'),
(28, 1, 3, NULL, '2019-08-07 19:11:30', '2019-08-07', 'feedings', '{}'),
(29, 1, 3, NULL, '2019-08-07 22:32:14', '2019-08-07', 'changes', '2'),
(30, 1, 3, NULL, '2019-08-07 22:33:14', '2019-08-07', 'changes', '1'),
(31, 1, 3, NULL, '2019-08-08 00:23:36', '2019-08-07', 'feedings', '{}'),
(32, 1, 2, NULL, '2019-08-08 02:23:40', '2019-08-07', 'changes', '2'),
(33, 1, 1, '2019-08-07 19:13:43', '2019-08-08 13:09:11', '2019-08-08', 'naps', '{}'),
(34, 1, 2, NULL, '2019-08-08 15:09:16', '2019-08-08', 'feedings', '{}'),
(35, 1, 2, NULL, '2019-08-08 17:16:28', '2019-08-08', 'changes', '2'),
(36, 1, 3, '2019-08-08 11:16:16', '2019-08-08 20:19:16', '2019-08-08', 'naps', '{}'),
(37, 1, 3, NULL, '2019-08-08 21:14:28', '2019-08-08', 'feedings', '{}'),
(38, 1, 3, NULL, '2019-08-08 21:20:32', '2019-08-08', 'changes', '2'),
(39, 1, 3, NULL, '2019-08-09 00:14:32', '2019-08-08', 'feedings', '{}'),
(40, 1, 2, NULL, '2019-08-09 01:27:33', '2019-08-08', 'changes', '1'),
(41, 1, 1, NULL, '2019-08-09 03:38:17', '2019-08-08', 'changes', '2'),
(42, 1, 2, '2019-08-08 21:02:41', '2019-08-09 14:11:15', '2019-08-09', 'naps', '{}'),
(43, 1, 1, NULL, '2019-08-09 15:07:17', '2019-08-09', 'feedings', '{}'),
(44, 1, 2, NULL, '2019-08-09 17:17:37', '2019-08-09', 'changes', '2'),
(45, 1, 3, NULL, '2019-08-08 00:37:00', '2019-08-09', 'changes', '1'),
(46, 1, 1, NULL, '2019-08-07 02:25:20', '2019-08-07', 'feedings', '{}'),
(47, 1, 2, NULL, '2019-08-07 12:00:00', '2019-08-07', 'changes', '2'),
(48, 1, 1, '2019-08-07 03:13:15', '2019-08-07 05:09:20', '2019-08-07', 'naps', '{}'),
(49, 1, 3, '2019-08-07 09:21:14', '2019-08-07 10:16:22', '2019-08-07', 'naps', '{}'),
(50, 1, 1, '2019-08-07 07:24:18', '2019-08-07 08:10:20', '2019-08-07', 'naps', '{}'),
(51, 1, 2, NULL, '2019-08-07 12:26:28', '2019-08-07', 'feedings', '{}'),
(52, 1, 2, NULL, '2019-08-07 10:26:22', '2019-08-07', 'feedings', '{}'),
(53, 1, 1, NULL, '2019-08-07 08:28:23', '2019-08-07', 'feedings', '{}'),
(54, 1, 1, NULL, '2019-08-07 09:41:42', '2019-08-07', 'changes', '{}');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'parent', 'dad'),
(2, 'parent', 'mom'),
(3, 'caretaker', 'daycare teacher');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`) VALUES
(1, 'Steve'),
(2, 'Sophia'),
(3, 'John');

-- --------------------------------------------------------

--
-- Table structure for table `user_babies`
--

CREATE TABLE `user_babies` (
  `id` mediumint(9) NOT NULL,
  `user_id` mediumint(9) NOT NULL,
  `baby_id` mediumint(9) NOT NULL,
  `role_id` mediumint(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_babies`
--

INSERT INTO `user_babies` (`id`, `user_id`, `baby_id`, `role_id`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 2),
(3, 3, 1, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `babies`
--
ALTER TABLE `babies`
  ADD PRIMARY KEY (`babies`);

--
-- Indexes for table `baby_entries`
--
ALTER TABLE `baby_entries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_babies`
--
ALTER TABLE `user_babies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `babies`
--
ALTER TABLE `babies`
  MODIFY `babies` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `baby_entries`
--
ALTER TABLE `baby_entries`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user_babies`
--
ALTER TABLE `user_babies`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
