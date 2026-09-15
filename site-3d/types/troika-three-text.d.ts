// troika-three-text n'expose pas de types officiels. Déclaration minimale
// pour la seule API utilisée ici (voir lib/troikaConfig.ts).
declare module "troika-three-text" {
    export function configureTextBuilder(options: { useWorker?: boolean; [key: string]: unknown }): void;
}
