import {
  MiniPage,
  MiniPageSection,
  MiniPageSectionContent,
} from "@/components/custom/profile/common";
import {
  StatusItem,
  StatusTable,
} from "@/components/custom/sitesettings/status/item";
import {
  ConfigurationItem,
  ConfigurationTable,
} from "@/components/custom/sitesettings/configuration/item";
import api from "@/lib/api";
import appSettings from "@/lib/settings";
import { useEffect, useState } from "react";
import { type Configuration } from "@/lib/types";
import {
  BracesIcon,
  ImageIcon,
  DatabaseIcon,
  GithubIcon,
  ContainerIcon,
  HashIcon,
} from "lucide-react";
import Settings from "@/lib/settings";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { DEPLOYMENT } from "@/lib/enums";

function getVersionDescription(
  upToDate: boolean,
  currentVersion: string,
  latestVersion: string,
  updateLink: string,
) {
  const latestVersionLink = (
    <a
      href={updateLink}
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
    >
      {latestVersion}
    </a>
  );

  if (upToDate) {
    return <span>Up to date ({latestVersion})</span>;
  } else {
    return (
      <span>
        Update available ({currentVersion.slice(0, 7)} → {latestVersionLink})
      </span>
    );
  }
}

function updateLinkByHash(hash: string, repo: string) {
  return `https://github.com/docuisine/${repo}/commit/${hash}`;
}

function updateLinkByRelease(repo: string) {
  return `https://github.com/docuisine/${repo}/releases/latest`;
}

export default function SiteSettingsPage() {
  const [configuration, setConfiguration] = useState<Configuration | null>(
    null,
  );
  const [imageHostOK, setImageHostOK] = useState<boolean | null>(null);

  useEffect(() => {
    api.getConfiguration().then(setConfiguration);
    api.healthImageHost().then(setImageHostOK);
  }, []);

  if (!configuration) {
    return (
      <div className="flex justify-center items-center gap-4 h-full w-full m-auto text-lg">
        <Spinner className="w-8 h-8" /> Loading...
      </div>
    );
  }
  let frontendDeployment;
  let isBackendLatestVersion = false;
  let isFrontendLatestVersion = false;

  // Check backend version based on deployment method
  if (configuration.backendDeployment === DEPLOYMENT.DOCKER) {
    isBackendLatestVersion =
      configuration.backendVersion === configuration.backendLatestVersion;
  } else {
    isBackendLatestVersion =
      configuration.backendCommitHash === configuration.backendLatestCommitHash;
  }

  // Check frontend version on Vercel using commit SHA
  // IF we are running on Vercel, this env var will be truthy
  if (import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA) {
    isFrontendLatestVersion =
      import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA ===
      configuration.frontendLatestCommitHash;
    frontendDeployment = DEPLOYMENT.VERCEL;
    // Else we should be running on Docker
    // Check frontend version on Docker using version number
  } else {
    isFrontendLatestVersion =
      appSettings.APP_VERSION === configuration.frontendLatestVersion;
    frontendDeployment = DEPLOYMENT.DOCKER;
  }

  const isUsingDefaultSecrets = configuration.defaultSecretsUsed.length > 0;
  const configurationItems = [
    {
      icon: <ContainerIcon />,
      label: "Backend Deployment",
      description: configuration.backendDeployment,
    },

    {
      icon: <ContainerIcon />,
      label: "Frontend Deployment",
      description: frontendDeployment,
    },
    {
      icon: <HashIcon />,
      label: "Frontend Build",
      description: Settings.APP_VERSION,
    },
    {
      icon: <HashIcon />,
      label: "Backend Build",
      description: configuration.backendCommitHash,
    },
    { icon: <BracesIcon />, label: "API", description: Settings.BACKEND_URL },
    {
      icon: <ImageIcon />,
      label: "Image Host",
      description: appSettings.IMAGE_HOST,
    },
    {
      icon: <DatabaseIcon />,
      label: "Database",
      description: configuration.databaseURL,
    },
    {
      icon: <DatabaseIcon />,
      label: "Database Type",
      description: configuration.databaseType,
    },
  ];

  return (
    <MiniPage>
      <MiniPageSection title="Status">
        <MiniPageSectionContent>
          <StatusTable>
            <StatusItem
              color={isFrontendLatestVersion ? "green" : "yellow"}
              label="Frontend"
              description={getVersionDescription(
                isFrontendLatestVersion,
                frontendDeployment === DEPLOYMENT.DOCKER
                  ? Settings.APP_VERSION
                  : import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA || "unknown",
                frontendDeployment === DEPLOYMENT.DOCKER
                  ? configuration.frontendLatestVersion
                  : configuration.frontendLatestCommitHash.slice(0, 7),
                frontendDeployment === DEPLOYMENT.DOCKER
                  ? updateLinkByRelease("docuisine-react")
                  : updateLinkByHash(
                      configuration.frontendLatestCommitHash,
                      "docuisine-react",
                    ),
              )}
            />
            <StatusItem
              color={isBackendLatestVersion ? "green" : "yellow"}
              label="Backend"
              description={getVersionDescription(
                isBackendLatestVersion,
                configuration.backendDeployment === DEPLOYMENT.DOCKER
                  ? configuration.backendVersion
                  : configuration.backendCommitHash.slice(0, 7),
                configuration.backendDeployment === DEPLOYMENT.DOCKER
                  ? configuration.backendLatestVersion
                  : configuration.backendLatestCommitHash.slice(0, 7),
                configuration.backendDeployment === DEPLOYMENT.DOCKER
                  ? updateLinkByRelease("docuisine")
                  : updateLinkByHash(
                      configuration.backendLatestCommitHash,
                      "docuisine",
                    ),
              )}
            />
            <StatusItem
              color={imageHostOK ? "green" : "red"}
              label="Image Host"
              description={
                imageHostOK === null
                  ? "Checking..."
                  : imageHostOK
                    ? "Image host is reachable"
                    : "Image host is not reachable"
              }
            />
            <StatusItem
              color={!isUsingDefaultSecrets ? "green" : "red"}
              label="Secrets"
              description={
                isUsingDefaultSecrets
                  ? `Default secrets are being used: ${configuration.defaultSecretsUsed.join(
                      ", ",
                    )}`
                  : "No default secrets in use"
              }
            />
          </StatusTable>
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="Configuration">
        <MiniPageSectionContent>
          <ConfigurationTable>
            {configurationItems.map((item) => (
              <ConfigurationItem
                label={item.label}
                description={item.description}
              >
                {item.icon}
              </ConfigurationItem>
            ))}
          </ConfigurationTable>
        </MiniPageSectionContent>
      </MiniPageSection>
      <MiniPageSection title="Bug Report">
        <MiniPageSectionContent>
          <Button>
            <GithubIcon />
            <a
              href="https://github.com/docuisine/backlog/issues/new/choose"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report a bug or issue
            </a>
          </Button>
        </MiniPageSectionContent>
      </MiniPageSection>
    </MiniPage>
  );
}
