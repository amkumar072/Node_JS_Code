const log = require('debug')('log');
const { accountRequestHelper } = require('./account-request.js');

const getResponse = (requestData, status) => {

    const reqData = requestData || {
        AccountId: "22290",
        StandingOrderId: "22830",
        Frequency: "EvryDay",
        Reference: "BEntity3",
        FirstPaymentDateTime: "2018-10-03T22:35:05.531Z",
        FirstPaymentAmount: {
            Amount: "200.50",
            Currency: "GBP"
        },
        NextPaymentDateTime: "2018-10-03T22:35:05.531Z",
        NextPaymentAmount: {
            Amount: "42.50",
            Currency: "GBP"
        },
        FinalPaymentDateTime: "2018-10-03T22:35:05.531Z",
        FinalPaymentAmount: {
            Amount: "182.50",
            Currency: "GBP"
        },
        Servicer: {
            SchemeName: "BICFI",
            Identification: "BankY"
        },
        CreditorAccount: {
            SchemeName: "IBAN",
            Identification: "BankY",
            Name: "RBS Mortgage",
            SecondaryIdentification: "Beneg"
        }

    }

    const data = {
        StandingOrder: [
            {
                AccountId: reqData.AccountId,
                StandingOrderId: reqData.StandingOrderId,
                Frequency: reqData.Frequency,
                Reference: reqData.Reference,
                FirstPaymentDateTime: reqData.FirstPaymentDateTime,
                FirstPaymentAmount: {
                    Amount: reqData.FirstPaymentAmount.Amount,
                    Currency: reqData.FirstPaymentAmount.Currency
                },
                NextPaymentDateTime: reqData.NextPaymentDateTime,
                NextPaymentAmount: {
                    Amount: reqData.NextPaymentAmount.Amount,
                    Currency: reqData.NextPaymentAmount.Currency
                },
                FinalPaymentDateTime: reqData.FinalPaymentDateTime,
                FinalPaymentAmount: {
                    Amount: reqData.FinalPaymentAmount.Amount,
                    Currency: reqData.FinalPaymentAmount.Currency
                },
                Servicer: {
                    SchemeName: reqData.Servicer.SchemeName,
                    Identification: reqData.Servicer.Identification
                },
                CreditorAccount: {
                    SchemeName: reqData.CreditorAccount.SchemeName,
                    Identification: reqData.CreditorAccount.Identification,
                    Name: reqData.CreditorAccount.Name,
                    SecondaryIdentification: reqData.CreditorAccount.SecondaryIdentification
                }
            }
        ]
    }

    const resp = Object.assign({
        Data: data,
        Links: {
            Self: `/open-banking/v1.1/standing-orders`,
        },
        Meta: {
            TotalPages: 1,
        }
    });
    return resp;
};

const standingOrder = (() => {


    const get = (req, res) => {
        const authorization = req.headers['authorization']; // eslint-disable-line
        log(`standing-orders #get authorization: ${authorization}`);

        const authorized = accountRequestHelper.checkAuthorization({ authorization });
        log(`standing-orders #get authorized: ${authorized}`);

        const interactionId = req.headers['x-fapi-interaction-id'] || '';
        log(`standing-orders #get interactionId: ${interactionId}`);

        const financialId = req.headers['x-fapi-financial-id'];
        log(`standing-orders #get financialId: ${financialId}`);

        const standingOrderRequest = getResponse( null, 'Authorised');
        log(`standing-orders #get standing-order: ${JSON.stringify(standingOrderRequest)}`);

        if (!authorized) {
            res.sendStatus(401);
        }
        if (authorized && standingOrderRequest) {
            res.status(200)
                .header('Content-Type', 'application/json')
                .header('x-fapi-interaction-id', interactionId)
                .header('x-fapi-financial-id', financialId)
                .json(standingOrderRequest);
        } else {
            // request a resource URL with an resource Id that does not exist,
            // the ASPSP must respond with a 400 (Bad Request)
            res.sendStatus(400);
        }
    };


    const standingOrderMiddleware = (req, res, next) => {
        if (req.path.indexOf('/open-banking/v1.1/standing-orders') === -1) {
            next();
        } else {
            // Hand off to Account Request Handler
            switch (req.method) {

                case 'GET':
                    get(req, res);
                    break;

                default:
                    res.sendStatus(400);
                    break;
            }
        }
    };

    return {
        get,
        getResponse,
        standingOrderMiddleware,
    };
})();

exports.standingOrder = standingOrder;