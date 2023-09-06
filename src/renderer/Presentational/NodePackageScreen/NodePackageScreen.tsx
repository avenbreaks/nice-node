// import { useTranslation } from 'react-i18next';

import { useCallback, useEffect, useState } from 'react';
// import { NodeStatus } from '../common/node';
import { setModalState } from '../../state/modal';
import electron from '../../electronGlobal';
// import { useGetNodesQuery } from './state/nodeService';
import { useAppSelector, useAppDispatch } from '../../state/hooks';
import {
  selectIsAvailableForPolling,
  selectSelectedNodePackage,
  updateSelectedNodeId,
} from '../../state/node';
import {
  useGetExecutionIsSyncingQuery,
  useGetExecutionLatestBlockQuery,
  useGetExecutionPeersQuery,
  useGetNodeVersionQuery,
} from '../../state/services';
// import { useGetNetworkConnectedQuery } from './state/network';
import ContentSingleClient, {
  SingleNodeContent,
} from '../ContentSingleClient/ContentSingleClient';
import { hexToDecimal } from '../../utils';
import { ClientProps, NodeAction } from '../../Generics/redesign/consts';
import Button from '../../Generics/redesign/Button/Button';
import {
  container,
  contentContainer,
  titleFont,
  descriptionFont,
} from './NodePackageScreen.css';
import { NodeBackgroundId } from '../../assets/images/nodeBackgrounds';
import ContentMultipleClients from '../ContentMultipleClients/ContentMultipleClients';

let alphaModalRendered = false;

const NodePackageScreen = () => {
  // const { t } = useTranslation();
  const selectedNodePackage = useAppSelector(selectSelectedNodePackage);
  const qNodeVersion = useGetNodeVersionQuery(
    selectedNodePackage?.spec.rpcTranslation,
  );
  const [sFormattedServices, setFormattedServices] = useState<ClientProps[]>();
  const [sIsSyncing, setIsSyncing] = useState<boolean>();
  const [sSyncPercent, setSyncPercent] = useState<string>('');
  const [sPeers, setPeers] = useState<number>();
  const [sFreeStorageGBs, setFreeStorageGBs] = useState<number>(0);
  const [sTotalDiskSize, setTotalDiskSize] = useState<number>(0);
  const [sHasSeenAlphaModal, setHasSeenAlphaModal] = useState<boolean>();
  const [sLatestBlockNumber, setLatestBlockNumber] = useState<number>(0);
  const sIsAvailableForPolling = useAppSelector(selectIsAvailableForPolling);
  const pollingInterval = sIsAvailableForPolling ? 15000 : 0;
  const qExecutionIsSyncing = useGetExecutionIsSyncingQuery(
    selectedNodePackage?.spec.rpcTranslation,
    {
      pollingInterval,
    },
  );
  // const isSelectedNodePackage = selectedNodePackage !== undefined;
  // const peersPolling = isSelectedNodePackage ? pollingInterval : 0;
  const qExecutionPeers = useGetExecutionPeersQuery(
    selectedNodePackage?.spec.rpcTranslation,
    {
      pollingInterval,
    },
  );
  const qLatestBlock = useGetExecutionLatestBlockQuery(
    selectedNodePackage?.spec.rpcTranslation,
    {
      pollingInterval,
    },
  );

  // use to show if internet is disconnected
  // const qNetwork = useGetNetworkConnectedQuery(null, {
  //   // Only polls network connection if there are exactly 0 peers
  //   pollingInterval: typeof sPeers === 'number' && sPeers === 0 ? 30000 : 0,
  // });

  const diskUsed = selectedNodePackage?.runtime?.usage?.diskGBs?.[0]?.y ?? 0;
  const cpuPercent = selectedNodePackage?.runtime?.usage?.cpuPercent ?? [
    { x: 0, y: 0 },
  ];
  const memoryPercent = selectedNodePackage?.runtime?.usage?.memoryBytes ?? [
    { x: 0, y: 0 },
  ];
  // eslint-disable-next-line eqeqeq
  // const isHttpEnabled =
  //   selectedNodePackage?.config?.configValuesMap?.http &&
  //   ['Enabled', 'enabled', 'true', true, 1].includes(
  //     selectedNodePackage?.config?.configValuesMap?.http
  //   );
  // todo: http apis

  const getNodesDefaultStorageLocation = async () => {
    const defaultNodesStorageDetails =
      await electron.getNodesDefaultStorageLocation();
    setFreeStorageGBs(defaultNodesStorageDetails.freeStorageGBs);
  };

  useEffect(() => {
    getNodesDefaultStorageLocation();
    const interval = setInterval(getNodesDefaultStorageLocation, 15000);
    return () => clearInterval(interval);
  }, []);

  const getSystemSize = async () => {
    setTotalDiskSize(await electron.getSystemDiskSize());
  };

  useEffect(() => {
    getSystemSize();
  }, []);

  useEffect(() => {
    if (!sIsAvailableForPolling) {
      // clear all node data when it becomes unavailable to get
      setSyncPercent('');
      setIsSyncing(undefined);
      setPeers(undefined);
      setLatestBlockNumber(0);
    }
  }, [sIsAvailableForPolling]);

  useEffect(() => {
    console.log('qExecutionIsSyncing: ', qExecutionIsSyncing);
    if (qExecutionIsSyncing.isError) {
      setSyncPercent('');
      setIsSyncing(undefined);
      return;
    }
    const syncingData = qExecutionIsSyncing.data;
    if (typeof syncingData === 'object') {
      setSyncPercent(syncingData.syncPercent);
      setIsSyncing(syncingData.isSyncing);
    }
    // else if (syncingData === false) {
    //   // light client geth, it is done syncing if data is false
    //   setSyncPercent('');
    //   setIsSyncing(false);
    // }
    else {
      setSyncPercent('');
      setIsSyncing(undefined);
    }
  }, [qExecutionIsSyncing]);

  useEffect(() => {
    console.log('qExecutionPeers: ', qExecutionPeers.data);
    if (qExecutionPeers.isError) {
      setPeers(undefined);
      return;
    }
    if (typeof qExecutionPeers.data === 'string') {
      setPeers(qExecutionPeers.data);
    } else if (typeof qExecutionPeers.data === 'number') {
      setPeers(qExecutionPeers.data.toString());
    } else {
      setPeers(undefined);
    }
  }, [qExecutionPeers]);

  useEffect(() => {
    const savedSyncedBlock =
      selectedNodePackage?.runtime?.usage?.syncedBlock || 0;
    if (qLatestBlock.isError) {
      setLatestBlockNumber(savedSyncedBlock);
      return;
    }

    const updateNodeLSB = async (latestBlockNum: number) => {
      if (!selectedNodePackage) {
        return;
      }
      await electron.updateNodeLastSyncedBlock(
        selectedNodePackage.id,
        latestBlockNum,
      );
    };

    const blockNumber = qLatestBlock?.data?.number;
    const slotNumber = qLatestBlock?.data?.header?.message?.slot;
    const rpcTranslation = selectedNodePackage?.spec?.rpcTranslation;

    let latestBlockNum = 0;
    if (
      blockNumber &&
      typeof blockNumber === 'string' &&
      rpcTranslation === 'eth-l1'
    ) {
      latestBlockNum = hexToDecimal(blockNumber);
    } else if (
      slotNumber &&
      typeof slotNumber === 'string' &&
      rpcTranslation === 'eth-l1-beacon'
    ) {
      latestBlockNum = parseFloat(slotNumber);
    }

    const syncedBlock =
      latestBlockNum > savedSyncedBlock ? latestBlockNum : savedSyncedBlock;
    setLatestBlockNumber(syncedBlock);
    updateNodeLSB(syncedBlock);
  }, [qLatestBlock, selectedNodePackage]);

  const onNodeAction = useCallback(
    (action: NodeAction) => {
      console.log('NodeAction for node: ', action, selectedNodePackage);
      if (selectedNodePackage) {
        if (action === 'start') {
          electron.startNode(selectedNodePackage.id);
        } else if (action === 'stop') {
          electron.stopNode(selectedNodePackage.id);
        } else if (action === 'logs') {
          // show logs
        } else if (action === 'settings') {
          // show settings
        }
      }
    },
    [selectedNodePackage],
  );

  useEffect(() => {
    const setAlphaModal = async () => {
      const hasSeenAlpha = await electron.getSetHasSeenAlphaModal();
      setHasSeenAlphaModal(hasSeenAlpha || false);
    };
    setAlphaModal();
  }, []);
  // useEffect(() => {
  //   qNodeInfo.refetch();
  // }, [selectedNodePackage]);

  // Will select the Node with the given id, and will only rerender if the given Node data changes
  // https://redux-toolkit.js.org/rtk-query/usage/queries#selecting-data-from-a-query-result
  // const { selectedNodePackage } = useGetNodesQuery(undefined, {
  //   selectFromResult: ({ data }: { data: Node[] }) => {
  //     return {
  //       selectedNodePackage: data?.find((node) => node.id === sSelectedNodePackageId),
  //     };
  //   },
  // });
  const dispatch = useAppDispatch();

  useEffect(() => {
    // format for presentation
    const formattedServices: ClientProps[] = [];
    selectedNodePackage?.services.map((service) => {
      const serviceProps: ClientProps = {
        id: service.node.id,
        name: service.node.spec.specId,
        displayName: service.node.spec.displayName as NodeBackgroundId,
        version: '',
        nodeType: service.serviceName,
        status: {},
        stats: {},
      };
      formattedServices.push(serviceProps);
    });
    setFormattedServices(formattedServices);
  }, [selectedNodePackage?.services]);

  if (sHasSeenAlphaModal === false && !alphaModalRendered) {
    dispatch(
      setModalState({
        isModalOpen: true,
        screen: { route: 'alphaBuild', type: 'info' },
      }),
    );
    alphaModalRendered = true;
  }

  if (!selectedNodePackage) {
    // if there is no node selected, prompt user to create a new node
    return (
      <div className={container}>
        <div className={contentContainer}>
          <div className={titleFont}>No active nodes</div>
          <div className={descriptionFont}>
            Add your first node and start verifying the validty of every block
            of your favourite blockchain. Running a node also helps others to
            download and update their copies.
          </div>
          <Button
            label="Add node"
            variant="icon-left"
            iconId="add"
            type="primary"
            onClick={() => {
              dispatch(
                setModalState({
                  isModalOpen: true,
                  screen: { route: 'addNode', type: 'modal' },
                }),
              );
            }}
          />
        </div>
      </div>
    );
  }

  const { status, spec } = selectedNodePackage;
  // todo: get node type, single or multi-service
  // parse node details from selectedNodePackage => SingleNodeContent
  // todo: add stop/start ability?

  // TODO: make this more flexible for other client specs
  const formatSpec = (info: string | undefined) => {
    if (!info) {
      return '';
    }
    if (info.includes('BeaconNode')) {
      return 'Consensus Client — Ethereum Mainnet';
    }
    if (info.includes('Execution')) {
      return 'Execution Client — Ethereum Mainnet';
    }
    return info;
  };

  const formatVersion = (version: string | undefined, name: string) => {
    if (!version) {
      return '';
    }
    const capitalize = (s: string) =>
      (s && s[0].toUpperCase() + s.slice(1)) || '';

    let regex;
    switch (name) {
      case 'geth' || 'op-geth' || 'op-node':
        regex = /Geth\/v(\d+\.\d+\.\d+)/;
        break;
      case 'besu':
        regex = /besu\/v(\d+\.\d+\.\d+)/;
        break;
      case 'erigon':
        regex = /(\d+\.\d+\.\d+)-dev/;
        break;
      case 'nethermind':
      case 'lighthouse':
        // eslint-disable-next-line no-useless-escape
        regex = new RegExp(`${capitalize(name)}\/v(\\d+\\.\\d+\\.\\d+)`);
        break;
      case 'lodestar':
        regex = /Lodestar\/v(\d+\.\d+\.\d+)/;
        break;
      case 'prysm':
        regex = /prysm\/v(\d+\.\d+\.\d+)/;
        break;
      case 'teku':
        regex = /teku\/v(\d+\.\d+\.\d+)/;
        break;
      case 'nimbus':
        regex = /Nimbus\/v(\d+\.\d+\.\d+)/;
        break;
      default:
        console.error(`Invalid software name: ${name}`);
        return version; // At least, return the unformatted version string
    }

    const match = version.match(regex);

    if (match) {
      const versionString = `v${match[1]}`;
      return versionString;
    }
    console.error(`No version number found for ${name}`);
    return '';
  };

  const clientName = spec.specId.replace('-beacon', '');
  const nodeVersionData =
    typeof qNodeVersion === 'string' ? qNodeVersion : qNodeVersion?.currentData;

  const nodeContent: SingleNodeContent = {
    nodeId: selectedNodePackage.id,
    displayName: spec.displayName,
    name: clientName as NodeBackgroundId,
    screenType: 'client',
    rpcTranslation: spec.rpcTranslation,
    version: formatVersion(nodeVersionData, clientName),
    info: formatSpec(spec.category),
    status: {
      stopped: status === 'stopped',
      error: status.includes('error'),
      synchronized: !sIsSyncing && parseFloat(sSyncPercent) > 99.9,
    },
    stats: {
      peers: sPeers,
      currentBlock: sLatestBlockNumber,
      diskUsageGBs: diskUsed,
    },
    tabsData: {
      cpuPercent,
      memoryPercent,
      diskUsed: selectedNodePackage?.runtime?.usage?.diskGBs,
      diskFree: sFreeStorageGBs,
      diskTotal: sTotalDiskSize,
    },
    onAction: onNodeAction,
    description: spec.description,
  };

  /**
   * export interface ClientStatusProps {
  updating?: boolean;
  initialized?: boolean; // initial initialization is done
  synchronized?: boolean; // constantly updated from checking current / height slot or block
  lowPeerCount?: boolean;
  updateAvailable?: boolean;
  blocksBehind?: boolean;
  noConnection?: boolean;
  stopped?: boolean;
  error?: boolean;
}

export interface ClientStatsProps {
  currentBlock?: number;
  highestBlock?: number;
  currentSlot?: number;
  highestSlot?: number;
  peers?: number;
  cpuLoad?: number;
  diskUsageGBs?: number;
  rewards?: number;
  balance?: number;
  stake?: number;
}

export interface ClientProps {
  name: NodeBackgroundId;
  version: string;
  nodeType: string;
  status: ClientStatusProps;
  stats: ClientStatsProps;
}
   */
  console.log('passing content to NodePackageScreen: ', nodeContent);

  // todo: use ContentMultiClient
  // return <ContentSingleClient {...nodeContent} />;
  return (
    <div>
      <ContentMultipleClients
        clients={sFormattedServices}
        nodeContent={nodeContent}
      />
      <p>{JSON.stringify(nodeContent)}</p>
    </div>
  );

  // start button disabled logic
  // disabled={
  //   !(
  //     status === NodeStatus.created ||
  //     status === NodeStatus.readyToStart ||
  //     status === NodeStatus.errorStarting ||
  //     status === NodeStatus.errorRunning ||
  //     status === NodeStatus.stopped ||
  //     status === NodeStatus.errorStopping ||
  //     status === NodeStatus.unknown
  // stop button disabled logic
  //   disabled={status !== NodeStatus.running}
};
export default NodePackageScreen;
