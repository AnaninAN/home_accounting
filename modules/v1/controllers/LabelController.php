<?php


namespace app\modules\v1\controllers;


use app\modules\v1\models\Label;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

class LabelController extends ActiveController
{
    public $modelClass = Label::class;

    public function behaviors()
    {
        $behaviors = parent::behaviors();

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