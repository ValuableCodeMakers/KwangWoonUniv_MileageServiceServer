-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_data
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('aJO2G1CDn-p_C-Z2ORsklseyqgFZURqF',1616761014,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_data` (
  `id` int NOT NULL,
  `password` longtext,
  `user_salt` longtext,
  `name` varchar(45) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
INSERT INTO `user_data` VALUES (1,'ilGSTx0g3Ri9OSrNpSWG9vTHoLTkiegg5dTwiQ2sVW7vk3sfENetKhx7dSpQbNLcvUwqdpaGyHM4Kv+W6C2ylbtnS6jspUzJrZ+fn+GU6J33BK1YrHyzW5WhGxBRB2I0BQhJ53QL8ymfLxlyaZ4K9SH6NvuSK8hgEQENFQuviSI=','hh9KZgcDvBeZPDe+v2J6ZxJiKIxROJnjFwut1zsBDDZCwIAt0cSpRyhAF7YNcDoBA46ik8Lf07O2XyfCkUflVA==','경진','Roh','소프트웨어학부'),(2,'/fGlzEV+XXryPq3sui+acyg59aOKl/mV6idEwM4s0foxsYo4WYmRpaWVYNWXFjFdBBLNtQeHNTzuBYU5RY6oaN+x2jcV50XRR32Uj7ieXaqz1a7flFzlEDEyP/WYjIEjCq5wOgRUkcEtcmqgnFF8pjxVA9S1/gVrDGfUTiZQ9mQ=','nOlMpInBjJqsBgbajcw1SQqDP65f0Y7UpigTqcMZKVHhJ25Yade2Wg3wOrPQ8Y7KNQXkg8e7NFxJgF0Sjy5d7w==','2','2','2'),(2013742022,'so0bpeq6XhMqwq18WDOV/8UhNs+m9TDOS76PJgnWJr5D6Ca/owOVnnGwRF0RQCO2sT6wdnlylztdDgOFMe+YmonNgspFz5SpfgapfXamnorvs495wVeTKU2kJcS0UQmjqzrAlTHhMclRd/78ugj/+c7Va1mzagQE+5lDiINGUBg=','nMPOzvESdhkvktpaWD4oCVGiuc0pL7NP8behWvnv74RUOl+uAVPJ9HlwUfNuK63Ea91ht6QQKOJTibP8CYlwNg==','ji-su','22','Electronic Convergence Engineering'),(2014734024,'kTK6twurfc0NkRGHwXUsgj6CKXXlxWWWVCOTWoZFxyCcwCY4eDzys+uuTLOhFn/ZQ8ntbGbQQcnYbNZdMuFzM6grIK6qKyo11m11+yXHGbmvUd5N7CJ8McvdUun2VOut2Z0ob4dPRTQQO2O1k2Cm9YYvgZ4qFbmWnkFoZL3fXGM=','EHWMyX1tZ/vLZ+SWwBjVRPv77vaikFDsLbrq3pLt0QdGQ40hui69GNnC+nK8jipHQ2CkIIExoB+xpmVuHyPrvA==','su-young','24','Electronic Materials Engineering'),(2014734045,'Htrxbj6Gj5qAm072Ple9rBQEPeXXViKNGKp6l3N3LHppIDQaKA0bN3qH3fZX1CwTgLp/MKyQovJn2ucijoDrDLgSQXC0ggZM2U6BD5FlpVHJiMcgO6liGG8ZuNEbQye3UvQeUVNfOaepg/gqUfFVMAxLNvCwxxxQ1dWVck/AyhY=','e9TX6n64Gt2dlnHoRQ5t4ozFkJpwrsh3yPENanaZ8kBd6HOYdhFrD6nnc0uEf7B2MMaA4iSKYf/l9Z+u8dzbUA==',NULL,NULL,'소프트웨어학부'),(2015508023,'R753OR3DaqYnQh51ZItRhseoNeKLilsKsm7VwtNUgUpGrcPBoJZGA4Gx3SnSA0sOIJGdqLSUTbbi7ss9KKJ3O/tu5X/d81GKmEbF8oBwoYC7/MGQsG0yMmxGzeV0YLuh4g/DBsQrZekJQXU3L/oOE6uAEXcU4b3r+SYwmbkA+Lw=','aE03K32XfEt+8tXKOvkCni0Yk7TEE/hCbQS1iuTZIV5ITc0+KEzlZfQLs6Z2CeArAdWDpESnF7C+gmWI/6eQBg==','a-rin','23','Business Administration'),(2015508040,'BI8d7SC0MfZUkz7Yw7JnAmBR737NAnrmfQSLmbXTjyr/t3DIE8Jp5vdivUMgPrPUy9vh5L4F5/EmXGsFxPLGIwUpZL4CbBWUm1KP7jsxHSBLJxB33xbVowHRgBKGfABFIclIriXSuVDJKDfqyTDJlT7+zRj1iPg09J87RdRWmz8=','RtGfdgyeE0INr/Aal04xVAPr+Q3crawDYjJGNWPPWPz5u8LzniywvOilDSSZBRTYmUBX5ve97044d8j9hQZIvQ==',NULL,NULL,'소프트웨어학부'),(2015722017,'9SCtxp31jTNbviTCOdGVGNtugsIS1TbGopT1JgxlcKu1cvCCvFdQb6YPN3kTeTEJ9oUJGNWT7mhi5hjwvot0O8S+FOPT735V17Ztv1ZcAAchzbCdbnYYVEPu/s19KaieWlj9/0JiD6jAqi8E1p5kB0J31NTq+Ak2Xa0v74KcBf0=','co5Q/gyhyz3KSgqVNUPVK5LfvclxtgxGgUqTOCwVxJBl+/4FH4gtT326yj0u+V01O3Im+kUV102Tc0Zyedqddg==','je-suk','17','소프트웨어학부'),(2015741021,'+24OXtGZlvHc1HpmS782b72Q3Bn9Ubl71c3vCagbZjlnV3s9LGUCFIhSE4UdbKmoF24hoq5rdCK7yXOVtwBE6wuEDgkFT1MkvSx4Y3XlKcEwmtRCX8suE04Hamrm9ieIV0Q/PnkLamJlKMBFWa9vrKo6D2jOAkyJiDI442PAPRk=','IaHhPfdGxiwz059rAvRtVOqXNbNpgsAUkypTqsYhDQnwhK88XFLcVBG0x28yBLZPLBkfeZEB5mV8e/QyNNCA+g==','dae-hyun','21','Robotics'),(2016123456,'a4pi8u0lyELu2bJbVuFVWRes4fRSK8z2Oe+YV6stB26vqOltkpZLelRyjH5FRqxL2ew06WmPHoFksPE5LlMM3WPX72MhMyJhBwUpAVHVg5CZPUCzEanItFVf2MMoKXGZ4yCC1ZmUK78FIcpZ3Jl4ht1fvjKV74EgMrdlnmpYiJw=','evjtcUMdgUblGBuQDu7q0qe/xVClFnz+qWxgI+sASCE9pvYtRhMSgTSMLMAsp1Nj0gvRF1LQ9f4MMkZPgDOdgw==','Joo','Joo','소프트웨어학부'),(2017127012,'rCrnUngb0s4PReckQsrEGzOME8gCTFcDRRXSTkBfI7Cy68nWT689CfqgrHLAcHFo2rRc/+9etTyfYiGT3nOTPvk7MNjfSgeHTz4w/2SJ9JHcFLmRpxxUErnDGGwVXbXut8qeoKikpLRuevedobkiB0eiqu2TWiLXcacuHW+l9uE=','1E6DzkOcs3bUqxcnTOZ0SUUgIymwLSGND7zRnhDwGQF5mXWOMWXl7edAlC71G/P5vxgydBYqWsUnE4VIah8frQ==','min-su','12','Architecture'),(2017202018,'ILcfO9XTHVg/FzM2tWytZ7TIiigPLUE3lFM76jY4KRdlc9GBLM3tqDv7wjlWQ3X77jeEYmoFU/YduQxFCywadL0/i5Nno/Zuvv8Vdo/SugN1A5YRPK1WH51rcUPZ5mp6BkvMfxi/l70IMiWjMIZgFdK3IquTs9VolXPA6AXM2qs=','tKL3zqh0r25vzXpkY2Ql4PQHHvz8inaAEpQSVFN90Fb8AF/8ONzs3TarvZiI9NDJdse0Z0gSQIq2MHavFxBnsw==','seung-ho','18','Computer and Information Engineering'),(2017202019,'ZVyHVJekQYTLuDJpeb6Cxa14damUt/7ODF7Ewupee7gFUNDIqpvcQyA6M2ZSNgktIvbc2SQklzRlj/31u2PlDW0GsCcpD324mvoFQ4/v4RyeyyNZiId4V6JKi2LLI2kRoD1PQjy2LA7aYkcWlL4Pd/L3Gjam5dDNepsNDR5yIU0=','D01oLKmFquA1TZWQ5LxVzFhyj49buvNqYvPP9omcwXXba2tyTxN1LS4wjG4oOjHyNByoeEE8MPJ8+y1hTX0kQw==','jun-ho','19','Computer and Information Engineering'),(2017311020,'FMck4zvs9X+hXnr8MFgiaYnZYwln5jw9mjL/z+eJY9WWTyGv3ZvxFfUV6SeNR2RRCM9Kqz6F2g+qU6FdCZ2pmTNDDpSztfni5AG8a9LEsMctkEOEI6yOw/RN5wot/xJFn9mR+oYUanVhX3Gsnt4Jore61l+aUP5lzXkYD+PKWMM=','K86ScOw2yGRa+I1zJiQZvSACAJ9ZaGPT6NsLH4dj9BRb8TtDSTYjlj7v1l9k3m/psBHnqVzXWkWZwrcuZJ9nKg==','min-ji','20','Industrial Psychology'),(2017508013,'a4IZ8kYz1b0lsM+IXRmdm2DLA+4w6jh2/Q6WqOu8qkWduaRjpiyYbN8GAQ8v+ed2NTjPE6rc9x8Zc/FGINDn5ZI8FX1fkyvmsqdsS8Wv9fS4xPQw+ozwHghVV4gOl467hbjRMnq5N1YanBkCzY4K2TO8YtJUcspFIfeSZYLtTYI=','R1/4T3OEUGznv90meBkPKrYuwkmz32vOMKwI0e1zb1X5Lkt1vzCbNPLxMOz9zaINzzbZTxxciPpjtxSsy5pi7A==','ha-hyun','13','Business Administration'),(2017706011,'glppRIsPSpzgu4i1/K2+CFYtDWlM55H3so+uYRimhayrdZr3P852vTDLxs50Gz8z3laF/k6XQc9fjknQ8oz3bKWxh2CA4VKGVvsgnM+QcmEEut84OX/LOR7jJW+tBjPZXYdeKC+VRf903vcYuHYaOdsoKitavQL9go3GRovq+e0=','ZOegk8VotrJIeYJ8yxZAriuDlBhdzh4KyyjWj2hQiT9NldwDGuqpfAu7+NSE9j3OHFifvcUHVCYvnAjJ6cDEaQ==','su-hyun','11','Electronic Engineering'),(2017707014,'Qwh2N6hqP9E6F766lpZRiJx1KRWGhO4MvghC/Yz1iTMxvYgVEB4ZS7D4ABOxrk09DNez6uyU7MUDWoWWC1dCNGDMSlVk9zlrs7Gd4omZiioyPYY8jE1tYiVk0BDkEgna7fizUqexFoSTpsLbFI8LRe2PjwjKD7pB2RQxnYrA99I=','o4H6cGN5LPdNABtdqzn/eDknLRqRiXn45O3WOOmE8nJnsOu6/dK1rG3HPH69bmJr0VtLxaz/6z8nn8v1w1BJlQ==','hong-jae','14','Electronics & Communications Engineering'),(2017732015,'kncBAfaaj9o783sM1dwXTGDhcudKyO13cQEEtJI6vG2T7IfVFQjJTkihTdDY7g16zwQxS7SBJxPPoqcLev6DjEyGCdHpnCwYJVWUUnrtMcrZqHtg+0BXg5DXwX+1jTj5aCIb5OxCvA6U4PN00FRHMmARN8GPFdxZhUgR+3uXRDA=','2Rpw9XasnqXJSqHpate5TqTVy6YGGWOO0kns0ij+/QcXLzXgvpmzZdCw5GrW9JVMmSDywQ4d1f1m6zD6ec1qvQ==','young-suk','15','Electric Engineering'),(2017732016,'PA2i7QCRiUHAzt4Au08HnQDpuY2oUfrImc7WXKxOgESOafrABYxV+tsn0/4ICloU2aMcpt4ass/LlgEslq7tUlSo+hY2aIxSeSh1uMJ6VweiDATDSvUXTGw4mPwjH1/NHHzuHxCmRj44KgW/cbUDgLXo0nxxGYCOfnRD81b0phk=','DoGFYB4wrhtMT6VrEjtS8dL7qdbzXcdIuPcBXpw5qLup9KEw0jiS28twQPUG5n1ATxaBlFuPPzXm6LEe9YMo/Q==','ha-rim','16','Electric Engineering');
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_photo`
--

DROP TABLE IF EXISTS `user_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_photo` (
  `id` int NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `filename` longtext,
  `path` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_photo`
--

LOCK TABLES `user_photo` WRITE;
/*!40000 ALTER TABLE `user_photo` DISABLE KEYS */;
INSERT INTO `user_photo` VALUES (1,'image/jpeg','1rn_image_picker_lib_temp_3c0ad3e0-c1c8-4d21-8743-becc3c89ee72.jpg','profiles\\1rn_image_picker_lib_temp_3c0ad3e0-c1c8-4d21-8743-becc3c89ee72.jpg'),(2,'image/jpeg','2rn_image_picker_lib_temp_955c22ed-6624-416e-9a27-4e5e1171d802.jpg','profiles\\2rn_image_picker_lib_temp_955c22ed-6624-416e-9a27-4e5e1171d802.jpg'),(2013742022,'image/jpeg','2013742022rn_image_picker_lib_temp_38ec5e2f-253e-4abb-9896-85c6f2408308.jpg','profiles\\2013742022rn_image_picker_lib_temp_38ec5e2f-253e-4abb-9896-85c6f2408308.jpg'),(2014734024,'image/jpeg','2014734024rn_image_picker_lib_temp_346886e3-4c87-4e2a-acae-c640191a0b48.jpg','profiles\\2014734024rn_image_picker_lib_temp_346886e3-4c87-4e2a-acae-c640191a0b48.jpg'),(2015508023,'image/jpeg','2015508023rn_image_picker_lib_temp_741e4d1d-ec9c-4f26-9ed1-03cd8a5a62bf.jpg','profiles\\2015508023rn_image_picker_lib_temp_741e4d1d-ec9c-4f26-9ed1-03cd8a5a62bf.jpg'),(2015722017,'image/jpeg','2015722017rn_image_picker_lib_temp_ff0fd22f-3909-45ea-9350-72a1d307bcbb.jpg','profiles\\2015722017rn_image_picker_lib_temp_ff0fd22f-3909-45ea-9350-72a1d307bcbb.jpg'),(2015741021,'image/jpeg','2015741021rn_image_picker_lib_temp_cd11aa23-0ae5-40c4-b4a3-231c7c266d25.jpg','profiles\\2015741021rn_image_picker_lib_temp_cd11aa23-0ae5-40c4-b4a3-231c7c266d25.jpg'),(2017127012,'image/jpeg','2017127012rn_image_picker_lib_temp_11ba6848-0329-4f11-ad21-9f7ab56e5f4f.jpg','profiles\\2017127012rn_image_picker_lib_temp_11ba6848-0329-4f11-ad21-9f7ab56e5f4f.jpg'),(2017202018,'image/jpeg','2017202018rn_image_picker_lib_temp_759d522b-f01c-4edf-8b38-4e77587d41b2.jpg','profiles\\2017202018rn_image_picker_lib_temp_759d522b-f01c-4edf-8b38-4e77587d41b2.jpg'),(2017202019,'image/jpeg','2017202019rn_image_picker_lib_temp_cf294186-028b-4ba5-ab0c-0a1ea7df2500.jpg','profiles\\2017202019rn_image_picker_lib_temp_cf294186-028b-4ba5-ab0c-0a1ea7df2500.jpg'),(2017311020,'image/jpeg','2017311020rn_image_picker_lib_temp_3b5a2a06-723a-4662-8ebb-f26017799192.jpg','profiles\\2017311020rn_image_picker_lib_temp_3b5a2a06-723a-4662-8ebb-f26017799192.jpg'),(2017508013,'image/jpeg','2017508013rn_image_picker_lib_temp_dfa2bf55-282c-4fbd-b430-83c56a7146b5.jpg','profiles\\2017508013rn_image_picker_lib_temp_dfa2bf55-282c-4fbd-b430-83c56a7146b5.jpg'),(2017706011,'image/jpeg','2017706011rn_image_picker_lib_temp_cfffddcf-0188-4a41-b0e9-61718a6d5874.jpg','profiles\\2017706011rn_image_picker_lib_temp_cfffddcf-0188-4a41-b0e9-61718a6d5874.jpg'),(2017707014,'image/jpeg','2017707014rn_image_picker_lib_temp_f6296878-19fd-41d7-995f-dac6610eef22.jpg','profiles\\2017707014rn_image_picker_lib_temp_f6296878-19fd-41d7-995f-dac6610eef22.jpg'),(2017732015,'image/jpeg','2017732015rn_image_picker_lib_temp_f772bcf4-05d2-463e-8216-406480ee3f91.jpg','profiles\\2017732015rn_image_picker_lib_temp_f772bcf4-05d2-463e-8216-406480ee3f91.jpg'),(2017732016,'image/jpeg','2017732016rn_image_picker_lib_temp_88deb73c-bc42-474b-9bd9-2c0ea6288ee5.jpg','profiles\\2017732016rn_image_picker_lib_temp_88deb73c-bc42-474b-9bd9-2c0ea6288ee5.jpg');
/*!40000 ALTER TABLE `user_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ranking`
--

DROP TABLE IF EXISTS `user_ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ranking` (
  `id` int NOT NULL,
  `balance` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ranking`
--

LOCK TABLES `user_ranking` WRITE;
/*!40000 ALTER TABLE `user_ranking` DISABLE KEYS */;
INSERT INTO `user_ranking` VALUES (1,3400),(2,1600),(2013742022,120),(2014734024,1000),(2014734045,200),(2015508023,1500),(2015508040,0),(2015722017,0),(2015741021,400),(2016123456,3000),(2017127012,200),(2017202018,10),(2017202019,1000),(2017311020,500),(2017508013,400),(2017706011,100),(2017707014,500),(2017732015,200),(2017732016,100);
/*!40000 ALTER TABLE `user_ranking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_wallet`
--

DROP TABLE IF EXISTS `user_wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_wallet` (
  `id` int NOT NULL,
  `mnemonic` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `privateKey` varchar(100) DEFAULT NULL,
  `specification` json DEFAULT NULL,
  `history` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_wallet`
--

LOCK TABLES `user_wallet` WRITE;
/*!40000 ALTER TABLE `user_wallet` DISABLE KEYS */;
INSERT INTO `user_wallet` VALUES (1,'neck ensure envelope door erase else desert valley fiction sign crop flight','0x49370FEFe6d137a212e5aD9170EB4f2326719675','3b7d194804d43d42a1fbba86e0e8357f9e57835f5cab9685346996f58dd1dccf','[{\"0\": {\"date\": \"2021-01-28\", \"amount\": \"100\", \"detail\": \"학교 이벤트\"}}, {\"1\": {\"date\": \"2021-02-14\", \"amount\": \"1000\", \"detail\": \"학교 이벤트\"}}, {\"2\": {\"date\": \"2021-10-10\", \"amount\": \"1000\", \"detail\": \"방문 이벤트\"}}, {\"3\": {\"date\": \"2021-03-05\", \"amount\": \"100\", \"detail\": \"방문 이벤트\"}}, {\"4\": {\"date\": \"2021-03-18\", \"amount\": \"500\", \"detail\": \"방문 이벤트\"}}, {\"5\": {\"date\": \"2021-03-18\", \"amount\": \"500\", \"detail\": \"방문 이벤트\"}}, {\"6\": {\"date\": \"2021-03-21\", \"amount\": \"-100\", \"detail\": \"토큰 전송\"}}]',NULL),(2,'clean bacon energy retire scatter transfer suffer twist neither toss patrol remind','0xdF81F014CAdC0672531454f8E61Bab6Ec3341904','ee2fe6b81796b70fbc0bfb39bf9f2d18358430e637b933784180086d89a06dd1','[{\"0\": {\"date\": \"2021-03-21\", \"amount\": \"-100\", \"detail\": \"토큰 전송\"}}]',NULL),(2013742022,'exhaust beyond arctic sunset flash license bag friend glory paddle believe ethics','0x03B7db398f25eBd725D80cef4C70be4cB5fc08ad','501ff5dad6df1e437e786598b91132a5770255a31214433e3edb136f9f6acd46',NULL,NULL),(2014734024,'fury casual number draw soul cage warfare bleak repair rude merry dumb','0xb1EF8B050c4D40335F7AA0418b3054bb20c0e475','1dcc4471da2c59f005cfdd96a5b812010eefdeaddd771a481caaee3bc634eaed',NULL,NULL),(2015508023,'vanish real main tired include letter evoke decorate kidney shell desert chief','0xDd040C8B4cEBA0B2fc06649799F8093E044dE424','30dd4b18771321de5382f0d60446679b8808c77c9d3f109e5dbdf271f18a7b86',NULL,NULL),(2015722017,'forest online film relief glance winter security prefer blush vacuum dismiss family','0xb9a00869d5f565542b3a5868634cA3136B9F6a3E','f7a4bbca1fa94f65773363a27b259238872042f4e9577f13f5b118b1a412e0bb',NULL,NULL),(2015741021,'cube shop property gospel chuckle video explain neck crack clip wink walnut','0xf64326D20392C04b1bE66D47bCd9e364C58Fa43F','ed4ec54312e56d89568bca1693d5701e703b0cd37bb780dad4b4c3f0f754a71e',NULL,NULL),(2016123456,'that zoo ride glass tip lesson metal milk burden world weapon vault','0xdB66E5274B2C071c9aa7a2CfbD16a8da312f6d43','537ee7c7984b912935c80c13ed98cc0f949addf0261ba8a675bc113788645f1e',NULL,NULL),(2017127012,'envelope hurdle settle bless swamp retreat timber invite squirrel balcony arm strategy','0xE1B32B3AcCAd981EC9542f7bb84863D9A325e875','4700d043dc0e1ead44733156334292410eeddff2ec861364c08e013013bffe4d',NULL,NULL),(2017202018,'electric middle puzzle million exist hybrid swim cash produce crisp trap sadness','0x791D113B0F7552c758Fd69F48398220689ee9617','0ce05bc6fda7c0b59254aa22f0bae93a1140b55216fb9d51158054a78046d30c',NULL,NULL),(2017202019,'yellow display income horn jar element release home holiday mercy palace bulk','0xcF32A124e083ddfbFbEC51A43ec98fa8209D4eD3','e0e8278ef7e95fac2c26571a2d370904856ae26017684a11158e1a98d9024005',NULL,NULL),(2017311020,'oppose proof mad love prison area square seek lady clever excite sunny','0x1ECa10D43A8A921c7b4a3DA37ff38EB678F3e86D','80b6d3a12ea3076848fd15c734973b06dd435d40391564bfff73d3d77092e21f',NULL,NULL),(2017508013,'nurse soul road park praise minor repair alone rally ghost chapter artefact','0x8A2dEe0D7C070102B16C17D90B450b2b6790fE72','59c094ecfcd6b2df82e5d29b81fe83342314888a4d6796fa455ee7f597356b86',NULL,NULL),(2017706011,'object resemble online food ignore apple final slender finger exit bridge awake','0x03A8b48cbDE277FBF1732fcAB4411ce2165Fc974','bd0c2daff442d738a5616206fb3bc0b71eb1bb3f1e54a8e1b6a6dd1a2ac5e5fa',NULL,NULL),(2017707014,'gesture swap jungle monitor cement foam keep shiver erase ancient online salon','0xd3453173B111d8f0DA594D70533436caED80FFe2','0bb9f02cf0e5c212b22ac2dca854b764190d42fc82a38e9a2b5382c960559e2b',NULL,NULL),(2017732015,'middle load oxygen pioneer size antenna claim lesson reward excuse weather observe','0x7e1CbBCDa5D7B4db0D484794dD55e7ae17354EcD','da91ea9f7d43fe57dabec0f1f01f43466651ce2561442c89fd26571a238860f3',NULL,NULL),(2017732016,'deal stadium they mom coconut vocal stable cupboard artefact twenty pledge sponsor','0xD329cF5deB3Caf9aDD5e36Da19e97A318Dca4ad8','ef38af06eb16045c5f14c6f05b3064e6b9602eb37d3a8e21ad5a492ec1156b70',NULL,NULL);
/*!40000 ALTER TABLE `user_wallet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-25 21:18:27
