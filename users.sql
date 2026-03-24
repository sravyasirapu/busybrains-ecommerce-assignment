-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 24, 2026 at 12:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `busybrains_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `username`) VALUES
(1, 'admin@gmail.com', '$2a$10$avsOynSj0JchzC7pw.PjfeyrD4RwXDM1GH.deQiYAirzUiCFjQaae', 'ROLE_ADMIN', 'admin'),
(2, 'user@example.com', '$2a$10$2x1GQH2La2dIEAkn2VlCQu4UP7JjpM1YKG.1sqF09AOkn7P8.VXsq', 'ROLE_USER', 'user'),
(3, 'sravyasirapu.61213@gmail.com', '', 'ROLE_USER', 'sravyasirapu.61213@gmail.com'),
(4, 'srav@gmail.com', '$2a$10$QYB/A.7RPa60PhgiffbeYuEpR5GVmnjGHCM7AWVpME42KOv4xUxtW', 'ROLE_USER', 'srav'),
(5, 'akira@gmail.com', '$2a$10$Fh6I2KvBi1GWzMiPWRdYvuHOIuW/EEfQtc2AiecWHOWRnFMfIYGcy', 'ROLE_USER', 'akira');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKr43af9ap4edm43mmtq01oddj6` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
