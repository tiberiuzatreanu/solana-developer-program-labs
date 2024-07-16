use anchor_lang::prelude::*;

declare_id!("27K3Sx3TWjBBT7dbhb6M2w4GUvB21zKHEsbk8LMbwMGv");

#[program]
pub mod lab {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
