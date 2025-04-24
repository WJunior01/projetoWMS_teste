import { XMLParser } from 'fast-xml-parser';

export interface NFeData {
  id: string;
  numero: string;
  chave: string;
  emitente: {
    nome: string;
    cnpj: string;
  };
  destinatario: {
    nome: string;
    cnpj: string;
  };
  dataEmissao: string;
  valor: number;
  produtos: Array<{
    codigo: string;
    descricao: string;
    ncm: string;
    quantidade: number;
    valorUnitario: number;
    valorTotal: number;
  }>;
}

export function parseNFe(xmlContent: string): NFeData | null {
  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    
    const result = parser.parse(xmlContent);
    
    // Acessando os dados da NFe
    const nfe = result.nfeProc?.NFe?.infNFe;
    
    if (!nfe) {
      return null;
    }
    
    // Extraindo dados básicos
    const ide = nfe.ide;
    const emit = nfe.emit;
    const dest = nfe.dest;
    const items = Array.isArray(nfe.det) ? nfe.det : [nfe.det];
    
    // Construindo o objeto de retorno
    const nfeData: NFeData = {
      id: nfe['@_Id'] || '',
      numero: ide.nNF || '',
      chave: result.nfeProc['@_Id'] || '',
      emitente: {
        nome: emit.xNome || '',
        cnpj: emit.CNPJ || '',
      },
      destinatario: {
        nome: dest.xNome || '',
        cnpj: dest.CNPJ || dest.CPF || '',
      },
      dataEmissao: ide.dhEmi || '',
      valor: parseFloat(nfe.total?.ICMSTot?.vNF || '0'),
      produtos: items.map((item: any) => ({
        codigo: item.prod.cProd || '',
        descricao: item.prod.xProd || '',
        ncm: item.prod.NCM || '',
        quantidade: parseFloat(item.prod.qCom || '0'),
        valorUnitario: parseFloat(item.prod.vUnCom || '0'),
        valorTotal: parseFloat(item.prod.vProd || '0'),
      })),
    };
    
    return nfeData;
  } catch (error) {
    console.error('Erro ao processar XML:', error);
    return null;
  }
}