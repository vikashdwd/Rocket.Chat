import { Markup } from '@rocket.chat/gazzodown';
import { parse } from '@rocket.chat/message-parser';
import { memo } from 'preact/compat';
import type { JSXInternal } from 'preact/src/jsx';

import { createClassName } from '../../../helpers/createClassName';
import isBigEmoji from '../../Emoji/isBigEmoji';
import shortnameToUnicode from '../../Emoji/shortnameToUnicode';
import styles from './styles.scss';

type MessageTextProps = {
	text: string;
	system?: boolean;
	className?: string;
	style?: JSXInternal.CSSProperties;
};
export const MessageText = memo(({ text, system, className, style = {} }: MessageTextProps) => {
	const bigEmoji = isBigEmoji(text);

	return (
		<div className={createClassName(styles, 'message-text', { system, bigEmoji }, [className])} style={style}>
			<Markup tokens={parse(shortnameToUnicode(text), { emoticons: true })} />
		</div>
	);
});
