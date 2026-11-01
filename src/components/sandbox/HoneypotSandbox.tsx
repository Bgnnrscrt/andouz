import type { Language } from '../../types';
import { getCommonCopy } from './commonCopy';
import type { Flow } from './engine';
import { SandboxFrame, StartScreen } from './SandboxFrame';
import { useSandbox } from './useSandbox';

/* Placeholder: the Honeypot scenario is built on top of the shared engine. */

type Step = 'idle';
const FLOW: Flow<Step> = { steps: ['idle'], hintDelay: 3000 };

export function HoneypotSandbox({ lang }: { lang: Language; onBuy: () => void }) {
  const common = getCommonCopy(lang);
  const sb = useSandbox<Step>({ flow: FLOW, initial: 'idle', hints: {}, viewOf: () => 'start', lang });
  return (
    <SandboxFrame
      sb={sb}
      caption={{ title: 'AndoGram', sub: '' }}
      phoneKey="a"
      viewKey="start"
      screenLabel="AndoGram"
      status={null}
      progress={0}
      restartLabel={common.restart}
      onRestart={() => sb.go('idle')}
    >
      <StartScreen title="AndoGram" sub="" cta={common.cta} onStart={() => sb.go('idle')} />
    </SandboxFrame>
  );
}

export default HoneypotSandbox;
