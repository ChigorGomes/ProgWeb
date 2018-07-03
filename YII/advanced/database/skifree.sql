-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 03/07/2018 às 14:40
-- Versão do servidor: 5.7.22-0ubuntu0.16.04.1
-- Versão do PHP: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `skifree`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `curso`
--

CREATE TABLE `curso` (
  `id` int(11) NOT NULL,
  `nome` varchar(45) COLLATE utf8_bin NOT NULL,
  `sigla` char(4) COLLATE utf8_bin NOT NULL,
  `descricao` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Fazendo dump de dados para tabela `curso`
--

INSERT INTO `curso` (`id`, `nome`, `sigla`, `descricao`) VALUES
(1, 'Ciência da Computação', 'IE08', 'O curso de Bacharelado em Ciência da Computação é resultado de um processo de consolidação do ensino e pesquisa em Ciência da Computação no norte do país, estando em consonância com as diretrizes estabelecidas pelo Ministério da Educação - MEC, também atendendo à Nova lei de Diretrizes e Bases da Educação Brasileira.'),
(2, 'Engenharia de Software', 'IE17', 'O curso de Bacharelado em Engenharia de Software apresenta direcionamentos que possibilitam a formação de um profissional capaz de conduzir o processo de desenvolvimento de software para atender diversas demandas em diferentes domínios que requeiram solução computacional, levando em consideração as capacidades dos seres humanos e das máquinas, balizado pelos custos envolvidos e impactos sobre a sociedade. Esta atuação dá-se através de metodologias e técnicas destinadas a projetar, modelar, analisar e resolver problemas com competência, criatividade, senso crítico e ética.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `jogada`
--

CREATE TABLE `jogada` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `pontuacao` int(11) NOT NULL,
  `data_hora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Fazendo dump de dados para tabela `jogada`
--

INSERT INTO `jogada` (`id`, `id_user`, `pontuacao`, `data_hora`) VALUES
(1, 2, 555, '2018-06-20 13:58:48');

-- --------------------------------------------------------

--
-- Estrutura para tabela `migration`
--

CREATE TABLE `migration` (
  `version` varchar(180) COLLATE utf8_bin NOT NULL,
  `apply_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Fazendo dump de dados para tabela `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1527723788),
('m130524_201442_init', 1527723790);

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_curso` int(11) DEFAULT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Fazendo dump de dados para tabela `user`
--

INSERT INTO `user` (`id`, `username`, `auth_key`, `password_hash`, `password_reset_token`, `email`, `id_curso`, `status`, `created_at`, `updated_at`) VALUES
(2, 'Maria', 'BgFpOcEOVb88Ie-Ny30E9J8rJ8xIEYpL', '$2y$13$FX8/kt6jWp.nGmUK6esfiuT4S7tdD449LRs8wQiMvNTtaDGUt2OIW', NULL, 'maria@gmail.com', 1, 10, 6, 1530639232),
(4, 'cicero', '7QdACWc_v4ll6JoQeLuYur-o1NCHtGQ0', '$2y$13$ZtahG3TU7Bjcu2VGcimI3uVVIzarHboau6o1Xkv8YDqz8rT6yi062', NULL, 'higorgomesousa@gmail.com', 1, 10, 1530639339, 1530639339),
(5, 'fernando', 'nwQEaNvtQ_CWNLrCrd2__oXVqa5oOiZi', '$2y$13$HEWUbmOBLemTzd7Djv6xqOOK4fPJ3shpBQUV6VhsepuOIHsHgxLpq', NULL, 'fernando@gmail.com', 2, 10, 1530639367, 1530639367);

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `jogada`
--
ALTER TABLE `jogada`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`id_user`);

--
-- Índices de tabela `migration`
--
ALTER TABLE `migration`
  ADD PRIMARY KEY (`version`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `password_reset_token` (`password_reset_token`),
  ADD KEY `fk_curso` (`id_curso`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `curso`
--
ALTER TABLE `curso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `jogada`
--
ALTER TABLE `jogada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `jogada`
--
ALTER TABLE `jogada`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Restrições para tabelas `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_curso` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
