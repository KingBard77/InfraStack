<?php

namespace App\Command;

use App\Service\Layout\ShareService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'app:studio:shares:cleanup',
    description: 'Preview or delete expired anonymous Studio share snapshots.'
)]
class StudioShareCleanupCommand extends Command
{
    public function __construct(private readonly ShareService $shareService)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addOption('dry-run', null, InputOption::VALUE_NONE, 'Preview expired snapshots without deleting them.')
            ->addOption('delete', null, InputOption::VALUE_NONE, 'Permanently delete expired snapshots.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        if ($input->getOption('dry-run') && $input->getOption('delete')) {
            $io->error('Use either --dry-run or --delete, not both.');
            return Command::INVALID;
        }

        $delete = (bool) $input->getOption('delete');
        $result = $this->shareService->cleanupExpired($delete);
        $io->table(
            ['Mode', 'Examined', 'Expired', 'Deleted', 'Legacy kept', 'Invalid kept', 'Failures'],
            [[
                $delete ? 'delete' : 'dry-run',
                $result['examined'],
                $result['expired'],
                $result['deleted'],
                $result['legacy'],
                $result['invalid'],
                $result['failed'],
            ]]
        );

        if ($result['failed'] > 0) {
            $io->error('One or more expired snapshots could not be deleted.');
            return Command::FAILURE;
        }
        if ($delete) {
            $io->success(sprintf('%d expired snapshot(s) deleted.', $result['deleted']));
        } else {
            $io->note('Preview only. Run again with --delete to remove expired snapshots.');
        }

        return Command::SUCCESS;
    }
}
