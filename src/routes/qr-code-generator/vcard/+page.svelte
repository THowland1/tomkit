<script lang="ts">
	import { getContentContext } from '../content-context';

	function getDefaultVCard(): VCard {
		return {
			names: {
				firstname: '',
				middlename: '',
				surname: '',
				prefix: '',
				suffix: ''
			},
			phone: '',
			email: '',
			address: {
				pobox: '',
				ext: '',
				street: '',
				locality: '',
				region: '',
				code: '',
				country: ''
			},
			note: ''
		};
	}
	type VCard = {
		names: {
			firstname: string;
			middlename: string;
			surname: string;
			prefix: string;
			suffix: string;
		};
		phone: string;
		email: string;
		address: {
			pobox: string;
			ext: string;
			street: string;
			/** e.g. Town / City */ locality: string;
			/** e.g. County / State */ region: string;
			/** e.g. Postcode / Zip code */ code: string;
			country: string;
		};
		note: string;
	};

	function formatVCard(value: VCard) {
		const items = ['BEGIN:VCARD', 'VERSION:4.0'];

		const { surname, firstname, middlename, prefix, suffix } = value.names;
		if ([surname, firstname, middlename, prefix, suffix].some(Boolean)) {
			items.push(`N:${surname};${firstname};${middlename};${prefix};${suffix}`);
			items.push(`FN:${firstname} ${surname}`);
		}

		if (value.email) items.push(`EMAIL:${value.email}`);
		if (value.phone) items.push(`TEL:${value.phone}`);

		const { pobox, ext, street, locality, region, code, country } = value.address;
		if ([pobox, ext, street, locality, region, code, country].some(Boolean)) {
			items.push(`ADR:${pobox};${ext};${street};${locality};${region};${code};${country}`);
		}
		if (value.note) items.push(`NOTE:${value.note}`);

		items.push('END:VCARD');
		return items.map((i) => i.replaceAll('\n', '\\n')).join('\r\n');
	}

	const content = getContentContext();
	let vcard = getDefaultVCard();
	$: {
		$content = formatVCard(vcard);
	}
</script>

<div class="whole-thing">
	<div>
		<h2 class="h2">vCard</h2>
		<p class="p">
			Scannable calling card.<br />For instant "Add to Contacts" or lost-and-found stickers.<br /> Understood
			by all mobile devices.
		</p>
	</div>
	<div class="keyvalue">
		<div class="key">
			<label class="label" for="firstname">Name</label>
		</div>
		<div class="value">
			<input
				id="firstname"
				class="input"
				type="text"
				bind:value={vcard.names.firstname}
				placeholder="First name"
			/>
			<input class="input" type="text" bind:value={vcard.names.surname} placeholder="Surname" />
		</div>
	</div>
	<div class="keyvalue">
		<div class="key">
			<label class="label" for="phone">Phone</label>
		</div>
		<div class="value">
			<input id="phone" class="input" type="tel" bind:value={vcard.phone} placeholder="Mobile" />
		</div>
	</div>
	<div class="keyvalue">
		<div class="key">
			<label class="label" for="email">Email</label>
		</div>
		<div class="value">
			<input id="email" class="input" type="email" bind:value={vcard.email} placeholder="Email" />
		</div>
	</div>
	<div class="keyvalue">
		<div class="key">
			<label class="label" for="address">Address</label>
		</div>
		<div class="value">
			<div class="column">
				<input id="address" class="input" bind:value={vcard.address.street} placeholder="Street" />
				<input
					id="address"
					class="input"
					bind:value={vcard.address.locality}
					placeholder="Town / City"
				/>
				<input id="address" class="input" bind:value={vcard.address.region} placeholder="County" />
				<input id="address" class="input" bind:value={vcard.address.code} placeholder="Postcode" />
				<input
					id="address"
					class="input"
					bind:value={vcard.address.country}
					placeholder="Country"
				/>
			</div>
		</div>
	</div>
	<div class="keyvalue">
		<div class="key">
			<label class="label" for="note">Note</label>
		</div>
		<div class="value">
			<div
				id="note"
				contenteditable
				class="input input-textarea"
				on:paste={(e) => {
					e.preventDefault();
					document.execCommand('insertHTML', false, e.clipboardData?.getData('text/plain') ?? '');
				}}
				on:input={(e) => (vcard.note = e.currentTarget.innerText)}
				placeholder="Note"
			>
				{vcard.note}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.whole-thing {
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		gap: 8px;
	}
	.h2 {
		color: var(--color-blue-400);
		font-size: 3rem;
		font-weight: 600;
	}
	.p {
		color: var(--color-blue-400);
		/* opacity: 0.5; */
		line-height: 1;
		font-size: clamp(1rem, 2vw, 1.15rem);
		font-weight: 600;
		margin-bottom: 16px;
	}

	.key {
		flex: 1;
		max-width: 10ch;
	}
	.value {
		flex: 1;
	}
	.label {
		color: var(--color-muted-text-on-light);
		text-transform: uppercase;
		font-size: 0.8em;
		letter-spacing: 0.5px;
		display: flex;
		align-items: center;
		height: 48px;
	}
	.input {
		height: 48px;
		line-height: 1.5;
		color: #253956;
		border-bottom: solid 1px var(--color-muted-text-on-light);
		width: 100%;

		&::placeholder {
			/* Chrome, Firefox, Opera, Safari 10.1+ */
			color: var(--color-muted-text-on-light);
			opacity: 1; /* Firefox */
		}

		&:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: var(--color-muted-text-on-light);
		}

		&::-ms-input-placeholder {
			/* Microsoft Edge */
			color: var(--color-muted-text-on-light);
		}

		&.input-textarea {
			height: auto;
			white-space: pre;
			min-height: 80px;
			padding-top: 10px;
			vertical-align: middle;
			&:empty::after {
				content: attr(placeholder);
				color: var(--color-muted-text-on-light);
			}
		}
	}
	.keyvalue {
		display: flex;
		gap: 8px;
	}
	.column {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
