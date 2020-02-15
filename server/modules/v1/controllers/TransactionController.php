<?php


namespace app\modules\v1\controllers;


use app\modules\v1\models\Account;
use app\modules\v1\models\Transaction;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\ForbiddenHttpException;

class TransactionController extends ActiveController
{
    public $modelClass = Transaction::class;

    public function behaviors()
        {
            $behaviors = parent::behaviors();

            $behaviors['corsFilter'] = [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    'Origin' => ['http://localhost:8080'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Allow-Credentials' => true,
                ],
            ];

            unset($behaviors['authenticator']);

            $behaviors['authenticator'] = [
                'class' => HttpBearerAuth::class,
                'except' => [],
            ];

            return $behaviors;
        }

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action === 'create' | $action === 'view' | $action === 'delete') {
            if(empty(Yii::$app->authManager->getRolesByUser(Yii::$app->user->id)['admin'])) {
                $account_id = ($action === 'create') ? Yii::$app->request->post('account_id') : $model->account_id;
                if(!$this->validateAccountId($account_id)) {
                    throw new ForbiddenHttpException('Wrong account_id');
                }
            }
        }

        if ($action === 'update') {
            if(empty(Yii::$app->authManager->getRolesByUser(Yii::$app->user->id)['admin'])) {
                if (!empty(Yii::$app->request->post('account_id'))) {
                    if (!$this->validateAccountId(Yii::$app->request->post('account_id'))) {
                        throw new ForbiddenHttpException('Wrong account_id');
                    }
                }
            }
        }
    }

    public function actions() {

        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }

    public function prepareDataProvider()
    {
        if(!empty(Yii::$app->authManager->getRolesByUser(Yii::$app->user->id)['admin'])) {
            return Transaction::find()->all();
        }

        $transactions = [];
        $accounts = Account::findAll(['user_id' => Yii::$app->user->id]);
        foreach ($accounts as $account) {
           $accountTransactions = Transaction::findAll(['account_id' => $account['id']]);
           foreach ($accountTransactions as $entity) {
               if ($entity['account_id'] === $account['id']) $transactions[] = $entity;
           }
        }
        return $transactions;
    }

    private function validateAccountId($account_id)
    {
        $account = Account::findOne(['id' => $account_id]);
        if (empty($account)) {
            return false;
        } else if ($account->user_id != Yii::$app->user->id) {
            return false;
        } else {
            return true;
        }
    }
}