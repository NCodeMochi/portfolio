"use client";

import { Code } from "lucide-react";
import type React from "react";
// Java is imported from fa6 (Font Awesome)
import { FaCloud, FaDatabase, FaDesktop, FaServer, FaWrench, FaJava } from "react-icons/fa6";
import { DiMsqlServer } from "react-icons/di"; // Reliable alternative for SQL Server/SSMS
import { TbApi } from "react-icons/tb"; // Great generic icon for "API"
import {
  SiAdonisjs,
  SiAmazondynamodb,
  SiAwslambda,
  SiBitbucket,
  SiBootstrap,
  SiCodeigniter,
  SiDocker,
  SiExpress,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiMaterialdesign,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiShopify,
  SiSvelte,
  SiTailwindcss,
  SiTypescript,
  SiWordpress,
  SiSonarqube,
  SiPostman,
  SiFirebase,
} from "react-icons/si";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  frontend: FaDesktop,
  backend: FaServer,
  database: FaDatabase,
  cloud: FaCloud,
  tools: FaWrench,
  git: SiGit,
  javascript: SiJavascript,
  next: SiNextdotjs,
  node: SiNodedotjs,
  postgres: SiPostgresql,
  react: SiReact,
  tailwind: SiTailwindcss,
  typescript: SiTypescript,
  mui: SiMaterialdesign,
  express: SiExpress,
  php: SiPhp,
  codeigniter: SiCodeigniter,
  mysql: SiMysql,
  redis: SiRedis,
  docker: SiDocker,
  graphql: SiGraphql,
  nest: SiNestjs,
  lambda: SiAwslambda,
  dynamodb: SiAmazondynamodb,
  mongodb: SiMongodb,
  bootstrap: SiBootstrap,
  bitbucket: SiBitbucket,
  wordpress: SiWordpress,
  shopify: SiShopify,
  python: SiPython,
  adonis: SiAdonisjs,
  svelte: SiSvelte,
  openai: SiOpenai,
  java: FaJava, // Updated to use FaJava
  sonarqube: SiSonarqube,
  ssms: DiMsqlServer,
  restapi: TbApi,      // Clean "API" text icon
  api: TbApi,
  postman: SiPostman,
  firebase: SiFirebase, // Firebase mapping
};

interface TechIconProps {
  icon: string;
  className?: string;
}

export function TechIcon({ icon, className = "h-6 w-6" }: TechIconProps) {
  const IconComponent = iconMap[icon.toLowerCase()];
  if (!IconComponent) {
    return <Code className={className} />;
  }
  return <IconComponent className={className} />;
}

export const availableIcons = Object.keys(iconMap);