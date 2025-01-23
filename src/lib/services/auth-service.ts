/**
 *
 *
 * Author: Elias Sjödin
 * Created: 2025-01-23
 */

import {
	PUBLIC_USER_POOL_ID,
	PUBLIC_USER_POOL_CLIENT_ID,
} from "$env/static/public";
import {
	EasyAuth,
	signIn,
	resetPassword,
	confirmResetPassword,
	confirmSignIn,
	signOut,
	type SignInInput,
	type ResetPasswordInput,
	type ConfirmResetPasswordInput,
	type SignInOutput,
	type ContinueSignInWithTOTPSetup,
	type SignUpOutput,
} from "@ilittlebig/easy-auth";
import { usernameStore, totpSetupDetailsStore } from "$lib/stores/auth-store.svelte";
import { resetPasswordVerificationDialog } from "$lib/components/dialogs/auth/reset-password-verification-dialog.svelte";
import { totpCodeDialog } from "$lib/components/dialogs/auth/totp-code-dialog.svelte";
import { totpSetupDialog } from "$lib/components/dialogs/auth/totp-setup-dialog.svelte";
import { newPasswordRequiredDialog } from "$lib/components/dialogs/auth/new-password-required-dialog.svelte";

export const handleNextStep = (nextStep: string = "", result?: SignInOutput | SignUpOutput) => {
	switch (nextStep) {
		case "CONTINUE_SIGN_IN_WITH_TOTP_SETUP":
			const setupDetails = (result?.nextStep as ContinueSignInWithTOTPSetup)?.totpSetupDetails;
			totpSetupDetailsStore.value = setupDetails;
			totpSetupDialog.open = true;
			break;
		case "CONTINUE_SIGN_IN_WITH_MFA_SELECTION": break;
		case "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED":
			newPasswordRequiredDialog.open = true;
			break;
		case "CONFIRM_SIGN_IN_WITH_TOTP_CODE":
			totpCodeDialog.open = true;
			break;
		case "RESET_PASSWORD":
		case "CONFIRM_RESET_PASSWORD_WITH_CODE":
			resetPasswordVerificationDialog.open = true;
			break;
		case "DONE":
			totpSetupDialog.open = false;
			newPasswordRequiredDialog.open = false;
			resetPasswordVerificationDialog.open = false;
			totpCodeDialog.open = false;
			break;
		default:
			break;
	}
}

export const handleChallengeResponse = async (response: { [key: string]: string }) => {
	const [challengeResponse] = Object.values(response);
	const result = await confirmSignIn({ challengeResponse });
	handleNextStep(result?.nextStep?.signInStep, result);
}

export const handleSignIn = async ({ username, password }: SignInInput) => {
	const result = await signIn({ username, password });
	usernameStore.value = username;
	handleNextStep(result?.nextStep?.signInStep, result);
}

export const handleResetPassword = async ({ username }: ResetPasswordInput) => {
	const result = await resetPassword({ username });
	usernameStore.value = username;
	handleNextStep(result?.nextStep?.resetPasswordStep);
}

export const handleResendResetPasswordCode = async () => {
	await resetPassword({ username: usernameStore.value });
}

export const handleSignOut = async (isGlobal: boolean = false) => {
	await signOut({ isGlobal });
}

export const handleConfirmResetPassword = async ({
	confirmationCode,
	newPassword
}: ConfirmResetPasswordInput) => {
	await confirmResetPassword({
		username: usernameStore.value,
		confirmationCode,
		newPassword,
	});
	handleNextStep("DONE");
}

export const configureEasyAuth = () => {
	EasyAuth.configure({
		Auth: {
			Cognito: {
				userPoolId: PUBLIC_USER_POOL_ID,
				userPoolClientId: PUBLIC_USER_POOL_CLIENT_ID,
			}
		}
	});
}
