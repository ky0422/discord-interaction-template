import { IMessageComponent } from '../utils/types';

export default {
    process: (interaction: IMessageComponent) => {
        interaction.reply({
            content: '** **',
            ephemeral: true,
        });
    },
    command: null,
};
