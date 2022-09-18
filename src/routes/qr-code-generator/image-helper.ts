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

	downloadSVG(svgstring: string, name = 'download.svg') {
		const svgurl = this.getSvgUrl(svgstring);
		this.downloadObjectURL(svgurl, name);
	}
	async downloadPNG(svgstring: string, name = 'download.png') {
		const svgurl = this.getSvgUrl(svgstring);
		const pngurl = await this.svgUrlToPngUrl(svgurl);
		this.downloadObjectURL(pngurl, name);
	}
	async copySVGToClipboard(svgstring: string) {
		await this.navigator.clipboard.write([
			new ClipboardItem({
				'text/plain': new Blob([svgstring], {
					type: 'text/plain'
				})
			})
		]);
	}
	async copyPNGToClipboard(svgstring: string) {
		const svgurl = this.getSvgUrl(svgstring);
		const blob = await this.svgUrlToPngBlob(svgurl);
		await this.navigator.clipboard.write([
			new ClipboardItem({
				'image/png': blob
			})
		]);
	}

	async svgStringToPngUrl(svgstring: string) {
		const svgurl = this.getSvgUrl(svgstring);
		const canvas = await this.svgUrlToCanvas(svgurl);
		return canvas.toDataURL();
	}

	private downloadObjectURL(objecturl: string, name: string) {
		const downloadLink = this.doc.createElement('a');
		downloadLink.href = objecturl;
		downloadLink.download = name;
		this.doc.body.appendChild(downloadLink);
		downloadLink.click();
		this.doc.body.removeChild(downloadLink);
	}

	private getSvgUrl(svgstring: string) {
		return URL.createObjectURL(
			new Blob([svgstring], {
				type: 'image/svg+xml'
			})
		);
	}

	private waitForOnLoad(el: HTMLImageElement): Promise<void> {
		return new Promise((resolve) => {
			el.onload = () => resolve();
		});
	}
	private waitForToBlob(el: HTMLCanvasElement): Promise<Blob> {
		return new Promise((resolve, reject) => {
			el.toBlob((blob) => (blob ? resolve(blob) : reject()), 'image/png');
		});
	}

	private async svgUrlToCanvas(svgUrl: string) {
		const imgPreview = this.doc.createElement('img');
		this.doc.body.appendChild(imgPreview);
		imgPreview.src = svgUrl;
		imgPreview.style.opacity = '0';
		await this.waitForOnLoad(imgPreview);
		const canvas = this.doc.createElement('canvas');
		canvas.width = imgPreview.clientWidth;
		canvas.height = imgPreview.clientHeight;
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Could not get new canvas context');

		ctx.drawImage(imgPreview, 0, 0);
		this.doc.body.removeChild(imgPreview);
		return canvas;
	}

	private async svgUrlToPngUrl(svgUrl: string) {
		const canvas = await this.svgUrlToCanvas(svgUrl);
		return canvas.toDataURL();
	}
	private async svgUrlToPngBlob(svgUrl: string) {
		const canvas = await this.svgUrlToCanvas(svgUrl);
		return this.waitForToBlob(canvas);
	}
}
