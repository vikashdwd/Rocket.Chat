import { isRoomFederated } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';
import { lazy, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import otr from '../../../app/otr/client/OTR';
import { useRoom } from '../../views/room/contexts/RoomContext';
import type { RoomToolboxActionConfig } from '../../views/room/contexts/RoomToolboxContext';

const OTR = lazy(() => import('../../views/room/contextualBar/OTR'));

export const useOTRRoomAction = () => {
	const enabled = useSetting('OTR_Enable', false);
	const room = useRoom();
	const federated = isRoomFederated(room);
	const capable = !!global.crypto;
	const { t } = useTranslation();

	useEffect(() => {
		otr.setEnabled(enabled && capable);
	}, [enabled, capable]);

	return useMemo((): RoomToolboxActionConfig | undefined => {
		if (!enabled || !capable) {
			return undefined;
		}

		return {
			id: 'otr',
			groups: ['direct'],
			title: 'OTR',
			icon: 'stopwatch',
			tabComponent: OTR,
			order: 13,
			full: true,
			...(federated && {
				tooltip: t('core.OTR_unavailable_for_federation'),
				disabled: true,
			}),
		};
	}, [enabled, capable, federated, t]);
};
