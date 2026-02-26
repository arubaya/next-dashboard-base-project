import Button from '@/components/ui/Button';
import Stack from '@/components/ui/Stack';
import Typography from '@/components/ui/Typography';
import { ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface EmailSentProps {
  resendEmail: () => void;
  email: string;
  isLoading: boolean;
  countDownTimeData: { formattedTime: string; isActive: boolean };
}

const EmailSent = ({ resendEmail, isLoading, countDownTimeData, email }: EmailSentProps) => {
  const t = useTranslations();
  return (
    <Stack justify="center" align="center" className="p-6 pb-12 md:p-8 md:pb-12 w-full" gap={6}>
      <ShieldCheck size={60} />

      {/* Title and subtitle */}
      <Stack className="text-center" align="center" gap={2}>
        <Typography variant={'h3'} className="text-2xl font-bold">
          {t('auth.sentEmailResetPassword.title')}
        </Typography>
        <Typography variant="small" className="text-muted-foreground">
          {t('auth.sentEmailResetPassword.subtitle', { email })}
        </Typography>
      </Stack>

      <Stack direction="row" align="center" gap={1}>
        <Typography variant="small">{t('common.emailNotReceived')}</Typography>
        <Button
          onClick={resendEmail}
          disabled={isLoading || countDownTimeData.isActive}
          loading={isLoading}
          size="sm"
          variant="ghost"
        >
          <Typography variant="small" className="text-inherit">
            {countDownTimeData.isActive ? countDownTimeData.formattedTime : t('common.resendEmail')}
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};

export default EmailSent;
