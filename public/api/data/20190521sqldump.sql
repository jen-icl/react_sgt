-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 21, 2019 at 11:42 PM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `grocery_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `grocery`
--

CREATE TABLE `grocery` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `item` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `store` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `unit_price` smallint(6) NOT NULL,
  `unit` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `grocery`
--

INSERT INTO `grocery` (`id`, `completed`, `item`, `store`, `unit_price`, `unit`, `added`) VALUES
(1, 0, 'strawberries', 'Ralph\'s', 125, 'lb', '2019-05-21 16:16:38'),
(2, 0, 'Cauliflower (Avg. 1.99lbs)', 'Sprouts', 149, 'lb', '2019-05-21 16:20:38'),
(3, 0, 'Peach Yellow Whole Trade Guarantee Organic', 'Whole Foods', 399, 'lb', '2019-05-21 16:39:10'),
(4, 0, 'strawberries', 'Albertsons', 249, 'pk', '2019-05-21 16:39:50'),
(5, 0, 'Chobani Fat Free Peach Greek Style Yogurt, 5.3 OZ', 'Sprouts', 99, 'ea', '2019-05-21 16:40:20'),
(6, 0, 'Silk Unsweetened Pure Almond Milk', 'Ralph\'s', 658, 'gal', '2019-05-21 16:40:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `grocery`
--
ALTER TABLE `grocery`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `grocery`
--
ALTER TABLE `grocery`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
