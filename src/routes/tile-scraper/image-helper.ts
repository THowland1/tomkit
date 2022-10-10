// eslint-disable-next-line @typescript-eslint/no-unused-vars
let document: never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let navigator: never;

export default class ImageHelper {
	get doc() {
		return globalThis.document;
	}
	get navigator() {
		return globalThis.navigator;
	}

	async downloadCanvasAsPNG(canvas: HTMLCanvasElement, name = 'download.png') {
		const pngurl = canvas.toDataURL();
		this.downloadObjectURL(pngurl, name);
	}

	async copyCanvasAsPNGToClipboard(canvas: HTMLCanvasElement) {
		const blob = await this.waitForToBlob(canvas);
		await this.navigator.clipboard.write([
			new ClipboardItem({
				'image/png': blob
			})
		]);
	}

	private downloadObjectURL(objecturl: string, name: string) {
		const downloadLink = this.doc.createElement('a');
		downloadLink.href = objecturl;
		downloadLink.download = name;
		this.doc.body.appendChild(downloadLink);
		downloadLink.click();
		this.doc.body.removeChild(downloadLink);
	}

	private waitForToBlob(el: HTMLCanvasElement): Promise<Blob> {
		return new Promise((resolve, reject) => {
			el.toBlob((blob) => (blob ? resolve(blob) : reject()), 'image/png');
		});
	}
}
