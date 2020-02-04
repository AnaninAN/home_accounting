<?php


namespace app\modules\v1\controllers;


use app\modules\v1\models\Currency;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class CurrencyController extends ActiveController
{
    public $modelClass = Currency::class;

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
        if ($action === 'create' | $action === 'update' | $action === 'delete') {
            if(empty(Yii::$app->authManager->getRolesByUser(Yii::$app->user->id)['admin'])) {
                throw new \yii\web\ForbiddenHttpException('Only Administrator can do this');
            }
        }
    }
}