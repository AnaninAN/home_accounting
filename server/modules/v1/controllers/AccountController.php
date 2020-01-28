<?php


namespace app\modules\v1\controllers;


use app\modules\v1\models\Account;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class AccountController extends ActiveController
{
    public $modelClass = Account::class;

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
        if ($action === 'view' | $action === 'update' | $action === 'delete') {
            if(empty(Yii::$app->authManager->getRolesByUser(Yii::$app->user->id)['admin'])) {
                if($model->user_id !== \Yii::$app->user->id) {
                    throw new \yii\web\ForbiddenHttpException(sprintf('You can only %s your accounts information.', $action));
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
            return Account::find()->all();
        }
        return Account::findAll(['user_id' => Yii::$app->user->id]);
    }
}